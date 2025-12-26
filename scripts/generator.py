import json
import os
import re
import unicodedata

# ==========================================
# === 1. CONFIGURATION ===
# ==========================================

# File keywords nằm ở thư mục gốc (ngang hàng package.json)
INPUT_FILE = 'keywords.txt'          
OUTPUT_JSON = 'data/slugs.json'  

# AFFILIATE LINK
GLOBAL_AFFILIATE_LINK = "https://t.crjmpx.com/322477/3785/0?bo=2753,2754,2755,2756&target=domainredirects&po=6456&aff_sub5=SF_006OG000004lmDN"

# YOUR DOMAIN (Để xuất file list link)
MY_DOMAIN = "https://fanshub-downloader.top" 

# --- TEMPLATES ---
# Mẫu tiêu đề (Link sẽ được tạo ra từ chính câu này)
TITLE_TEMPLATE = "OnlyFans {keyword} Leaked Full Video"

# Mẫu mô tả
DESC_TEMPLATE = "Exclusive videos for {keyword}. Click here to reveal the details immediately."

# ==========================================
# === 2. HELPER FUNCTIONS ===
# ==========================================

def slugify(text):
    """
    Chuyển đổi cả câu văn dài thành slug
    VD: "Hello World! 2025" -> "hello-world-2025"
    """
    if not text:
        return ""
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text).strip('-')
    return text

# ==========================================
# === 3. MAIN LOGIC ===
# ==========================================

def main():
    # Kiểm tra file input
    if not os.path.exists(INPUT_FILE):
        # Fallback: Thử tìm trong folder scripts nếu user chưa di chuyển file
        if os.path.exists(f'scripts/{INPUT_FILE}'):
            INPUT_FILE_PATH = f'scripts/{INPUT_FILE}'
        else:
            print(f"❌ Error: Không tìm thấy file '{INPUT_FILE}' ở thư mục gốc.")
            return
    else:
        INPUT_FILE_PATH = INPUT_FILE

    data_list = []
    print(f"⏳ Reading keywords from {INPUT_FILE_PATH}...")
    
    try:
        with open(INPUT_FILE_PATH, mode='r', encoding='utf-8') as f:
            lines = [line.strip() for line in f if line.strip()]
            
            for keyword in lines:
                # BƯỚC 1: Tạo Title đầy đủ trước
                full_title = TITLE_TEMPLATE.format(keyword=keyword)
                
                # BƯỚC 2: Tạo Slug từ chính cái Title vừa tạo
                # (Thay vì tạo từ keyword như cũ)
                slug = slugify(full_title)
                
                # BƯỚC 3: Tạo Description
                description = DESC_TEMPLATE.format(keyword=keyword)
                
                # Đóng gói
                item = {
                    "slug": slug,
                    "title": full_title,
                    "description": description,
                    "destination": GLOBAL_AFFILIATE_LINK
                }
                data_list.append(item)

        # Xuất file JSON
        os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
        with open(OUTPUT_JSON, 'w', encoding='utf-8') as json_file:
            json.dump(data_list, json_file, ensure_ascii=False, indent=2)

        print(f"✅ SUCCESS! Generated {len(data_list)} pages.")
        
        # Xuất file TXT chứa list link
        output_txt = 'list_links_full_title.txt'
        with open(output_txt, 'w', encoding='utf-8') as link_file:
            for item in data_list:
                full_url = f"{MY_DOMAIN}/{item['slug']}"
                link_file.write(f"{full_url}\n")
                
        print(f"📋 Link list ready at: {output_txt}")

    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    main()