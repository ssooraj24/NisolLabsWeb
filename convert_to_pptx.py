import os
import re
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Paths
INPUT_MD = r"C:\Users\ssooraj\.gemini\antigravity\brain\f0d787d7-d7b3-4742-bbd1-12e15fae293b\ConductOS_Presentation.md"
DOCS_DIR = r"E:\Nisol-Labs\ConductOS\Documents"
OUTPUT_PPTX = os.path.join(DOCS_DIR, "ConductOS_Presentation.pptx")

# Ensure Documents folder exists
os.makedirs(DOCS_DIR, exist_ok=True)

# Also copy MD to Documents folder for user convenience
with open(INPUT_MD, "r", encoding="utf-8") as f:
    full_text = f.read()

with open(os.path.join(DOCS_DIR, "ConductOS_Presentation.md"), "w", encoding="utf-8") as f:
    f.write(full_text)

# Parsing slides
slides_data = []

# Match slides like ## Slide 1: ... up to next ## Slide or # APPENDIX
slide_blocks = re.split(r'\n## Slide (\d+):?\s*', full_text)

# The first element is pre-slide text (exec summary etc.)
# Then pairs of (slide_num, slide_content)
for i in range(1, len(slide_blocks), 2):
    num = slide_blocks[i]
    content = slide_blocks[i+1]
    
    # Clean up content if it runs into Appendix
    if '# APPENDIX' in content:
        content = content.split('# APPENDIX')[0]
        
    lines = content.strip().split('\n')
    title = lines[0].strip()
    
    # Extract On-slide text, Speaker notes, Source files
    on_slide_text = []
    speaker_notes = ""
    source_files = ""
    
    # Parse sections
    # Find **On-slide text:**
    on_slide_part = ""
    notes_part = ""
    sources_part = ""
    
    m_on_slide = re.search(r'\*\*On-slide text:\*\*(.*?)(?=\*\*Speaker notes:\*\*|\Z)', content, re.DOTALL)
    if m_on_slide:
        on_slide_part = m_on_slide.group(1).strip()
        
    m_notes = re.search(r'\*\*Speaker notes:\*\*(.*?)(?=\*\*Source files:\*\*|\Z)', content, re.DOTALL)
    if m_notes:
        notes_part = m_notes.group(1).strip()
        
    m_sources = re.search(r'\*\*Source files:\*\*(.*)', content, re.DOTALL)
    if m_sources:
        sources_part = m_sources.group(1).strip()
        
    # Process notes: remove markdown blockquote '>'
    cleaned_notes = []
    for line in notes_part.split('\n'):
        line = line.strip()
        if line.startswith('>'):
            line = line.lstrip('>').strip()
        if line:
            cleaned_notes.append(line)
    speaker_notes = "\n\n".join(cleaned_notes)
    
    # Process on-slide text
    # Can contain bullet points, headers, tables, ascii art
    slides_data.append({
        "num": int(num),
        "title": title,
        "on_slide_raw": on_slide_part,
        "notes": speaker_notes,
        "sources": sources_part
    })

print(f"Parsed {len(slides_data)} slides.")

# Create Presentation
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5) # 16:9 widescreen

# Design Tokens (Professional Modern Dark Navy / Emerald Theme)
BG_COLOR = RGBColor(15, 23, 42)        # Slate 900
CARD_BG = RGBColor(30, 41, 59)        # Slate 800
CARD_BORDER = RGBColor(51, 65, 85)    # Slate 700
ACCENT_CYAN = RGBColor(56, 189, 248)  # Sky 400
ACCENT_GREEN = RGBColor(52, 211, 153) # Emerald 400
TEXT_WHITE = RGBColor(248, 250, 252)  # Slate 50
TEXT_MUTED = RGBColor(148, 163, 184)  # Slate 400
ACCENT_YELLOW = RGBColor(251, 191, 36)# Amber 400

blank_layout = prs.slide_layouts[6]

for s_data in slides_data:
    slide = prs.slides.add_slide(blank_layout)
    
    # Add slide notes
    if s_data["notes"]:
        notes_slide = slide.notes_slide
        text_frame = notes_slide.notes_text_frame
        text_frame.text = s_data["notes"]
        if s_data["sources"]:
            text_frame.text += "\n\n[Sources]: " + s_data["sources"]
            
    # Background rectangle
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = BG_COLOR
    bg.line.fill.background() # No border
    
    is_title_slide = (s_data["num"] == 1)
    
    if is_title_slide:
        # Title Slide Layout
        # Top banner pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.66), Inches(1.5), Inches(4.0), Inches(0.5))
        pill.fill.solid()
        pill.fill.fore_color.rgb = CARD_BG
        pill.line.color.rgb = ACCENT_CYAN
        tf_pill = pill.text_frame
        tf_pill.text = "AUTONOMOUS REVENUE OPERATING SYSTEM"
        p_pill = tf_pill.paragraphs[0]
        p_pill.font.size = Pt(11)
        p_pill.font.bold = True
        p_pill.font.color.rgb = ACCENT_CYAN
        p_pill.alignment = PP_ALIGN.CENTER
        
        # Main Title Box
        title_box = slide.shapes.add_textbox(Inches(1.5), Inches(2.2), Inches(10.33), Inches(3.0))
        tf = title_box.text_frame
        tf.word_wrap = True
        
        p1 = tf.paragraphs[0]
        p1.text = "ConductOS"
        p1.font.size = Pt(56)
        p1.font.bold = True
        p1.font.color.rgb = TEXT_WHITE
        p1.alignment = PP_ALIGN.CENTER
        
        p2 = tf.add_paragraph()
        p2.text = "Your Smart Revenue Machine"
        p2.font.size = Pt(28)
        p2.font.bold = True
        p2.font.color.rgb = ACCENT_GREEN
        p2.alignment = PP_ALIGN.CENTER
        p2.space_before = Pt(14)
        
        p3 = tf.add_paragraph()
        p3.text = "Nisol Labs — SENSE → THINK → ALIGN → ACT → LEARN"
        p3.font.size = Pt(18)
        p3.font.color.rgb = ACCENT_CYAN
        p3.alignment = PP_ALIGN.CENTER
        p3.space_before = Pt(10)
        
        # Bottom subtitle / analogy teaser box
        sub_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.5), Inches(5.2), Inches(8.33), Inches(1.2))
        sub_card.fill.solid()
        sub_card.fill.fore_color.rgb = CARD_BG
        sub_card.line.color.rgb = CARD_BORDER
        tf_sub = sub_card.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = "Explained so simply, even a vegetable seller can see the profit."
        p_sub.font.size = Pt(16)
        p_sub.font.italic = True
        p_sub.font.color.rgb = TEXT_WHITE
        p_sub.alignment = PP_ALIGN.CENTER
        
        p_sub2 = tf_sub.add_paragraph()
        p_sub2.text = "No technical jargon. Just customers, orders, cash, and growth."
        p_sub2.font.size = Pt(13)
        p_sub2.font.color.rgb = TEXT_MUTED
        p_sub2.alignment = PP_ALIGN.CENTER
        p_sub2.space_before = Pt(4)
        
    else:
        # Standard Slide Layout
        # Top Header Bar
        # Slide category/tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8.0), Inches(0.3))
        tf_tag = tag_box.text_frame
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = f"SLIDE {s_data['num']} • CONDUCTOS OVERVIEW"
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = ACCENT_CYAN
        
        # Slide Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.65), Inches(11.5), Inches(0.9))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        clean_title = s_data['title'].replace('#', '').strip()
        p_title.text = clean_title
        p_title.font.size = Pt(26)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        
        # Left Main Content Card (On-Slide text)
        left_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.65), Inches(7.5), Inches(5.2))
        left_card.fill.solid()
        left_card.fill.fore_color.rgb = CARD_BG
        left_card.line.color.rgb = CARD_BORDER
        
        tf_content = left_card.text_frame
        tf_content.word_wrap = True
        tf_content.margin_left = Inches(0.4)
        tf_content.margin_right = Inches(0.4)
        tf_content.margin_top = Inches(0.4)
        tf_content.margin_bottom = Inches(0.4)
        
        # Parse On-slide raw text into clean paragraphs
        raw_lines = [l.strip() for l in s_data["on_slide_raw"].split('\n') if l.strip()]
        
        first = True
        for line in raw_lines:
            # Skip duplicate headings
            if line.startswith('###') or line.startswith('#'):
                continue
                
            p = tf_content.paragraphs[0] if first else tf_content.add_paragraph()
            first = False
            
            # Format markdown table lines or bullets
            if line.startswith('|'):
                # Table format row
                cols = [c.strip() for c in line.split('|')[1:-1]]
                if cols and not all(c.startswith('-') for c in cols):
                    p.text = " •  " + "  —  ".join(cols)
                    p.font.size = Pt(13)
                    p.font.color.rgb = TEXT_WHITE
                    p.space_after = Pt(6)
            elif line.startswith('-') or line.startswith('*') or line.startswith('•'):
                bullet_text = line.lstrip('-*•').strip()
                p.text = "•  " + bullet_text
                p.font.size = Pt(15)
                p.font.color.rgb = TEXT_WHITE
                p.space_after = Pt(10)
                # Highlight checkmarks or crosses
                if "✅" in bullet_text or "🔥" in bullet_text or "🧠" in bullet_text:
                    p.font.bold = True
            elif line.startswith('```') or line.endswith('```'):
                continue
            else:
                p.text = line
                p.font.size = Pt(14)
                p.font.color.rgb = TEXT_MUTED
                p.space_after = Pt(8)
                
        # Right Side "Analogy & Business Takeaway" Card
        right_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.6), Inches(1.65), Inches(3.9), Inches(5.2))
        right_card.fill.solid()
        right_card.fill.fore_color.rgb = RGBColor(24, 33, 47)
        right_card.line.color.rgb = ACCENT_GREEN
        
        tf_right = right_card.text_frame
        tf_right.word_wrap = True
        tf_right.margin_left = Inches(0.3)
        tf_right.margin_right = Inches(0.3)
        tf_right.margin_top = Inches(0.3)
        
        p_r_hdr = tf_right.paragraphs[0]
        p_r_hdr.text = "VEGETABLE SELLER ANALOGY"
        p_r_hdr.font.size = Pt(11)
        p_r_hdr.font.bold = True
        p_r_hdr.font.color.rgb = ACCENT_GREEN
        p_r_hdr.space_after = Pt(12)
        
        # Extract a short punchy analogy snippet from speaker notes
        notes_paragraphs = [np for np in s_data["notes"].split('\n\n') if np.strip()]
        analogy_text = ""
        for np in notes_paragraphs:
            if any(k in np.lower() for k in ["sabziwala", "mandi", "tomato", "vegetable", "hotel", "khata", "delivery"]):
                analogy_text = np
                break
        if not analogy_text and notes_paragraphs:
            analogy_text = notes_paragraphs[0]
            
        # Clean up and shorten analogy to fit side card
        analogy_snippet = analogy_text[:380] + ("..." if len(analogy_text) > 380 else "")
        
        p_r_body = tf_right.add_paragraph()
        p_r_body.text = f'"{analogy_snippet}"'
        p_r_body.font.size = Pt(13)
        p_r_body.font.italic = True
        p_r_body.font.color.rgb = TEXT_WHITE
        p_r_body.space_after = Pt(16)
        
        # Key Business Takeaway Pill inside right card
        p_takeaway_hdr = tf_right.add_paragraph()
        p_takeaway_hdr.text = "BUSINESS IMPACT"
        p_takeaway_hdr.font.size = Pt(10)
        p_takeaway_hdr.font.bold = True
        p_takeaway_hdr.font.color.rgb = ACCENT_YELLOW
        p_takeaway_hdr.space_after = Pt(4)
        
        p_takeaway = tf_right.add_paragraph()
        if "Business value" in s_data["notes"]:
            bv = s_data["notes"].split("Business value")[-1].replace(":", "").strip()
            bv_clean = bv.split("\n")[0][:140]
            p_takeaway.text = bv_clean
        else:
            p_takeaway.text = "Increases win rates, prevents wasted hours, and guarantees disciplined profit."
        p_takeaway.font.size = Pt(12)
        p_takeaway.font.color.rgb = TEXT_MUTED

# Save presentation
prs.save(OUTPUT_PPTX)
print(f"Successfully generated PowerPoint at: {OUTPUT_PPTX}")
