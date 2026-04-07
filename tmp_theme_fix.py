import glob
import os

def transform(path):
    if "Dashboard.jsx" in path or "App.jsx" in path:
        return
        
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Light theme to Mesh Dark theme
    content = content.replace('text-gray-900', 'text-white')
    content = content.replace('text-gray-800', 'text-gray-100')
    content = content.replace('text-gray-700', 'text-gray-200')
    content = content.replace('text-gray-600', 'text-gray-300')
    content = content.replace('text-gray-500', 'text-gray-400')
    
    # Backgrounds
    content = content.replace('bg-white', 'bg-white/5')
    content = content.replace('bg-gray-50', 'bg-white/5')
    content = content.replace('bg-blue-50', 'bg-primary/10')
    content = content.replace('bg-emerald-50', 'bg-accent/10')
    content = content.replace('bg-orange-50', 'bg-warning/10')
    content = content.replace('bg-amber-50', 'bg-warning/10')
    content = content.replace('bg-red-50', 'bg-danger/10')
    
    # Borders
    content = content.replace('border-gray-200', 'border-white/10')
    content = content.replace('border-gray-100', 'border-white/5')
    content = content.replace('border-blue-100', 'border-primary/20')
    content = content.replace('border-emerald-100', 'border-accent/20')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

for p in glob.glob('c:/Users/HP/OneDrive/Desktop/Hackathon_Project/frontend/src/**/*.jsx', recursive=True):
    transform(p)

print("Theme updated for side pages.")
