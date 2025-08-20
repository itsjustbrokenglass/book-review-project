import os
import math
import xml.etree.ElementTree as ET
from PIL import Image

class ModernDeepZoom:
    def __init__(self, tile_size=256, tile_overlap=1, tile_format="jpg", image_quality=0.8):
        self.tile_size = tile_size
        self.tile_overlap = tile_overlap
        self.tile_format = tile_format
        self.image_quality = int(image_quality * 100)
        
    def create_tiles(self, image_path, output_dir):
        """Create Deep Zoom tiles from an image"""
        
        # Open the image
        print(f"Opening image: {image_path}")
        image = Image.open(image_path)
        width, height = image.size
        print(f"Image size: {width} x {height}")
        
        # Create output directory
        os.makedirs(output_dir, exist_ok=True)
        
        # Calculate number of levels
        max_dimension = max(width, height)
        levels = math.ceil(math.log2(max_dimension)) + 1
        print(f"Creating {levels} zoom levels")
        
        # Create tiles for each level
        for level in range(levels):
            level_dir = os.path.join(output_dir, str(level))
            os.makedirs(level_dir, exist_ok=True)
            
            # Calculate level dimensions
            scale = 2 ** (levels - 1 - level)
            level_width = max(1, math.ceil(width / scale))
            level_height = max(1, math.ceil(height / scale))
            
            # Resize image for this level
            level_image = image.resize((level_width, level_height), Image.LANCZOS)
            
            # Calculate number of tiles
            cols = math.ceil(level_width / self.tile_size)
            rows = math.ceil(level_height / self.tile_size)
            
            print(f"Level {level}: {level_width}x{level_height} ({cols}x{rows} tiles)")
            
            # Create tiles
            for row in range(rows):
                for col in range(cols):
                    # Calculate tile bounds
                    left = col * self.tile_size
                    top = row * self.tile_size
                    right = min(left + self.tile_size, level_width)
                    bottom = min(top + self.tile_size, level_height)
                    
                    # Extract tile
                    tile = level_image.crop((left, top, right, bottom))
                    
                    # Save tile
                    tile_filename = f"{col}_{row}.{self.tile_format}"
                    tile_path = os.path.join(level_dir, tile_filename)
                    
                    if self.tile_format.lower() == 'jpg':
                        tile.save(tile_path, "JPEG", quality=self.image_quality)
                    else:
                        tile.save(tile_path)
        
        # Create DZI descriptor file
        self.create_dzi_file(output_dir, width, height, levels)
        print(f"Deep Zoom tiles created successfully in: {output_dir}")
    
    def create_dzi_file(self, output_dir, width, height, levels):
        """Create the DZI XML descriptor file"""
        
        # Create XML structure
        root = ET.Element("Image")
        root.set("TileSize", str(self.tile_size))
        root.set("Overlap", str(self.tile_overlap))
        root.set("Format", self.tile_format)
        root.set("xmlns", "http://schemas.microsoft.com/deepzoom/2008")
        
        size_elem = ET.SubElement(root, "Size")
        size_elem.set("Width", str(width))
        size_elem.set("Height", str(height))
        
        # Write DZI file
        dzi_path = os.path.join(output_dir, "image.dzi")
        tree = ET.ElementTree(root)
        tree.write(dzi_path, encoding="utf-8", xml_declaration=True)
        
        print(f"DZI file created: {dzi_path}")

# Example usage
if __name__ == "__main__":
    # Create the deep zoom creator
    creator = ModernDeepZoom(
        tile_size=128,
        tile_overlap=2,
        tile_format="jpg",
        image_quality=0.8
    )
    
    # Specify your image path
    image_path = "bookshelf.jpg"  # Put your image in the same folder as this script
    output_directory = "deepzoom_output"
    
    # Check if image exists
    if not os.path.exists(image_path):
        print(f"Error: {image_path} not found!")
        print(f"Current directory: {os.getcwd()}")
        print("Available image files:")
        for file in os.listdir("."):
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff')):
                print(f"  - {file}")
    else:
        # Create the tiles
        creator.create_tiles(image_path, output_directory)
