# Tawk.to Chatbot Setup Guide

## 🚀 Quick Setup Steps

### 1. Create Tawk.to Account
1. Go to [https://www.tawk.to](https://www.tawk.to)
2. Sign up for free
3. Create a new property for "Lyra Enterprises"

### 2. Get Your Widget Code
1. In Tawk.to dashboard, go to **Administration > Chat Widget**
2. Copy your **Property ID** and **Widget ID** from the code
3. Example: `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`

### 3. Update Configuration
Replace `your-property-id` and `your-widget-id` in:
- `src/components/TawkToChat.tsx` (line 17)

```javascript
// Update this line with your actual IDs:
script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID'
```

### 4. Configure Chatbot in Tawk.to Dashboard

#### A. Set Up Auto-Greetings
1. Go to **Chat > Triggers**
2. Create new trigger:
   - **Name**: "Product Recommendation Welcome"
   - **Condition**: "Visitor starts chat"
   - **Action**: Send message (use the welcome message from our component)

#### B. Create Quick Responses
In **Chat > Shortcuts**, add these shortcuts:

**Shortcut: `!vending`**
```
🔹 VENDING MACHINES:
• Push Button - ₹9,000 (Schools)
• Solo Coin - ₹9,500 (Public places)  
• Solo QR - ₹15,000 (UPI payments)
• Solo WiFi - ₹22,500 (Smart, most popular)
• Solo Ethernet - ₹24,500 (Hospital grade)

Which type of facility is this for?
```

**Shortcut: `!incinerator`**
```
🔥 INCINERATORS:
• Lyra Micro - ₹9,500 (Compact, 1-5 napkins)
• Lyra Mini - ₹12,500 (Standard, 5-15 napkins)

Both are CPCB compliant & have 1-year warranty.
What's your daily usage requirement?
```

**Shortcut: `!contact`**
```
📞 Contact Details:
• Call: +91-8122378860
• Email: sales@lyraenterprise.co.in  
• WhatsApp: https://wa.me/918122378860

🏭 Factory: Chennai, Tamil Nadu
🚚 Free installation across India
💰 EMI options available
```

**Shortcut: `!school`**
```
🏫 PERFECT FOR SCHOOLS:

Recommended: Push Button - ₹9,000
✅ No coins needed (free for students)
✅ 25 napkin capacity
✅ Zero maintenance 
✅ Trusted by 50+ schools

+ Lyra Micro Incinerator - ₹9,500
✅ Safe waste disposal
✅ No infection risk

Total package: ₹18,500 (with 15% school discount)
```

#### C. Set Up Visitor Form
1. Go to **Chat > Pre-Chat Form**
2. Enable form with fields:
   - Name (required)
   - Email (required)
   - Phone (required)
   - Organization
   - "Type of facility" (dropdown: School, Hospital, Office, Public, Other)
   - "Expected users" (dropdown: 1-25, 25-50, 50-100, 100+)
   - "Budget range" (dropdown: <10k, 10-15k, 15-25k, 25k+)

#### D. Configure Availability
1. **Chat > Availability**
2. Set business hours: 9 AM - 7 PM IST (Monday-Saturday)
3. Add offline message: "Thanks for your interest! We'll respond within 2 hours. For urgent inquiries, call +91-8122378860"

### 5. Advanced Features (Optional)

#### A. Visitor Tracking
- Track visitor pages for better context
- Set up alerts for product page visits

#### B. Mobile App
- Download Tawk.to mobile app for instant responses
- Enable push notifications

#### C. Widget Customization
- Upload Lyra Enterprises logo
- Match brand colors (purple/pink theme)
- Set position to bottom-right

### 6. Testing Checklist

✅ Chat widget appears on website
✅ Welcome message displays correctly  
✅ Quick responses work with shortcuts
✅ Contact details are accurate
✅ Product recommendations are relevant
✅ Mobile responsiveness works
✅ Offline handling functions

### 🎯 Best Practices for Your Team

1. **Response Time**: Aim for under 2 minutes during business hours
2. **Product Knowledge**: Use the shortcuts for consistent information
3. **Lead Qualification**: Always collect facility type, user count, and budget
4. **Follow-up**: Send brochures/quotes via email after chat
5. **Escalation**: For technical questions, connect to engineering team

### 📊 Metrics to Track

- Chat volume by product category
- Conversion rate (chat to quote request)  
- Customer satisfaction scores
- Most common questions/pain points
- Peak chat hours for staffing

---

**Need help with setup? Contact the development team!**