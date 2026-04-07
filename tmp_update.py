import os
import glob
import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update text colors
    content = content.replace('text-white', 'text-gray-900')
    content = content.replace('text-gray-400', 'text-gray-600')
    content = content.replace('text-gray-300', 'text-gray-700')
    content = content.replace('text-gray-200', 'text-gray-800')
    
    # Update borders and backgrounds
    content = re.sub(r'border-white/[0-9]+', 'border-gray-200', content)
    content = content.replace('border-white', 'border-gray-200')
    content = re.sub(r'bg-white/([0-9]+)', r'bg-gray-200/\1', content)
    content = content.replace('bg-black/60', 'bg-white/80')
    content = content.replace('drop-shadow-[0_0_10px_white]', 'drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for p in glob.glob('c:/Users/HP/OneDrive/Desktop/Hackathon_Project/frontend/src/**/*.jsx', recursive=True):
    update_file(p)

print("Theme update complete.")
