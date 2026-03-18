'use client';

import { useState, useEffect } from 'react'

// TypeScript declaration for Tawk_API
declare global {
  interface Window {
    Tawk_API?: any;
  }
}

export default function TawkToChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot', time: string}>>([])
  const [inputText, setInputText] = useState('')
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (isOpen && showWelcome) {
      setTimeout(() => {
        setMessages([{
          text: `🙏 Welcome to Lyra Enterprises!

I'm here to help you find the perfect vending machine or incinerator for your needs.

To give you the best recommendation, please share:

1️⃣ **Type of facility?**
   • School/College
   • Hospital/Clinic  
   • Office/Corporate
   • Public restroom
   • Other

2️⃣ **Expected daily usage?**
   • 1-25 users
   • 25-50 users
   • 50-100 users
   • 100+ users

3️⃣ **Budget range?**
   • Under ₹10,000
   • ₹10,000 - ₹15,000
   • ₹15,000 - ₹25,000
   • Above ₹25,000

Based on your answers, I'll recommend the perfect solution! 💡`,
          sender: 'bot',
          time: new Date().toLocaleTimeString()
        }])
        setShowWelcome(false)
      }, 1000)
    }
  }, [isOpen, showWelcome])

  const sendMessage = () => {
    if (!inputText.trim()) return

    const newMessage = {
      text: inputText,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newMessage])
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputText.toLowerCase())
      setMessages(prev => [...prev, {
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      }])
    }, 1000)

    setInputText('')
  }

  const generateResponse = (userInput: string): string => {
    if (userInput.includes('school') || userInput.includes('college') || userInput.includes('student')) {
      return `🏫 **Perfect for Schools & Colleges:**

**Recommended: Push Button Vending Machine - ₹9,000**
✅ No coins needed - completely free for students
✅ 25 napkin capacity
✅ Tamper-proof design
✅ Zero maintenance
✅ Trusted by 50+ schools

**For Privacy: Lyra Micro Incinerator - ₹9,500**
✅ Safe disposal in washrooms
✅ No manual handling of waste
✅ CPCB compliant

📞 **Contact:** +91-8122378860
📧 **Email:** sales@lyraenterprise.co.in

Would you like a detailed quote for your school?`
    }

    if (userInput.includes('hospital') || userInput.includes('clinic') || userInput.includes('medical')) {
      return `🏥 **Hospital-Grade Solutions:**

**Recommended: Solo Ethernet - ₹24,500**
✅ 99.9% uptime with wired connection
✅ UPI + coin payments
✅ Cloud analytics & monitoring
✅ Touch screen display
✅ Perfect for high-traffic areas

**For Disposal: Lyra Mini Incinerator - ₹12,500**
✅ 5-15 napkins per cycle
✅ Digital temperature control
✅ Infection-free waste disposal
✅ SWM Rules 2016 compliant

📞 **Contact:** +91-8122378860
Hospital installations include staff training & maintenance support.`
    }

    if (userInput.includes('office') || userInput.includes('corporate') || userInput.includes('company')) {
      return `🏢 **Corporate Office Solutions:**

**Recommended: Solo WiFi - ₹22,500** ⭐ Most Popular
✅ UPI payments (GPay, PhonePe)
✅ No SIM card needed
✅ Real-time analytics
✅ Touch screen interface
✅ Perfect for modern offices

**Budget Option: Solo Coin - ₹9,500**  
✅ Simple coin operation
✅ Reliable & proven
✅ Low maintenance

📞 **Contact:** +91-8122378860
Corporate packages include bulk discounts & annual maintenance.`
    }

    if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('budget')) {
      return `💰 **Our Product Range & Prices:**

**🔹 VENDING MACHINES:**
• Push Button - ₹9,000 (Manual, perfect for schools)
• Solo Coin - ₹9,500 (₹5 coin operated)
• Solo QR - ₹15,000 (UPI payments)
• Solo RFID - ₹13,000 (Card access)
• Solo WiFi - ₹22,500 (Smart IoT, most popular)
• Solo Ethernet - ₹24,500 (Premium, hospital grade)

**🔹 INCINERATORS:**
• Lyra Micro - ₹9,500 (Compact, 1-5 napkins/cycle)
• Lyra Mini - ₹12,500 (Standard, 5-15 napkins/cycle)

📞 **Quick Contact:** +91-8122378860
🚚 **Free Installation & 1-Year Warranty**
💰 **EMI Options Available**

Which product interests you most?`
    }

    if (userInput.includes('incinerator') || userInput.includes('disposal') || userInput.includes('waste')) {
      return `🔥 **Safe Waste Disposal Solutions:**

**Lyra Micro - ₹9,500**
✅ Compact (520×230×230 mm)
✅ 1-5 napkins per cycle
✅ Up to 100 napkins/day
✅ Wall mountable
✅ Perfect for small facilities

**Lyra Mini - ₹12,500**  
✅ Larger capacity (650×330×330 mm)
✅ 5-15 napkins per cycle
✅ Digital temperature display
✅ IoT add-on available
✅ Ideal for colleges & hospitals

**Why Choose Incinerators?**
✅ Complete waste elimination
✅ No odor or infection risk 
✅ CPCB & SWM Rules 2016 compliant
✅ Zero manual handling
✅ Eco-friendly disposal

📞 **Contact:** +91-8122378860
Need help choosing the right capacity?`
    }

    if (userInput.includes('contact') || userInput.includes('phone') || userInput.includes('call')) {
      return `📞 **Contact Lyra Enterprises:**

**Phone:** +91-8122378860
**Email:** sales@lyraenterprise.co.in  
**WhatsApp:** https://wa.me/918122378860

🏭 **Factory:** Chennai, Tamil Nadu
🚚 Free installation across India
💰 EMI options available
🛡️ 1-year comprehensive warranty

**Business Hours:**
Monday-Friday: 9 AM - 7 PM
Saturday: 9 AM - 5 PM

How can I help you with your requirements?`
    }

    return `Thank you for your message! 

Here's how I can help you:

💡 **Type any of these for instant info:**
• "School" - Education solutions
• "Hospital" - Medical-grade machines  
• "Office" - Corporate packages
• "Price" - Complete price list
• "Incinerator" - Waste disposal options
• "Contact" - Get in touch with us

📞 **Quick Contact:** +91-8122378860
📧 **Email:** sales@lyraenterprise.co.in

What would you like to know about our vending machines and incinerators?`
  }

  const quickButtons = [
    { text: 'School Solutions', action: 'school' },
    { text: 'Hospital Grade', action: 'hospital' }, 
    { text: 'Office Packages', action: 'office' },
    { text: 'Price List', action: 'price' },
    { text: 'Contact Us', action: 'contact' }
  ]

  const handleQuickButton = (action: string) => {
    setInputText(action)
    setTimeout(() => sendMessage(), 100)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-[60]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">Chat with us!</span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-bold">Lyra Enterprises</h3>
          <p className="text-xs opacity-90">Product Expert 🤖</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
              message.sender === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
            }`}>
              <div className="whitespace-pre-line">{message.text}</div>
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Buttons */}
      <div className="p-2 border-t bg-white">
        <div className="flex flex-wrap gap-1 mb-2">
          {quickButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleQuickButton(button.action)}
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Smart product recommendation logic
function getProductRecommendations(type: string): string {
  const baseInfo = `
📞 **Quick Contact:** +91-8122378860
📧 **Email:** sales@lyraenterprise.co.in
📍 **Location:** Chennai, Tamil Nadu

🚚 **Free Installation & 1-Year Warranty**
💰 **EMI Options Available**
  `

  switch (type) {
    case 'price':
      return `
💰 **Our Product Range & Prices:**

**🔹 VENDING MACHINES:**
• Push Button - ₹9,000 (Manual, perfect for schools)
• Solo Coin - ₹9,500 (₹5 coin operated)
• Solo QR - ₹15,000 (UPI payments)
• Solo RFID - ₹13,000 (Card access)
• Solo WiFi - ₹22,500 (Smart IoT, most popular)
• Solo Ethernet - ₹24,500 (Premium, hospital grade)

**🔹 INCINERATORS:**
• Lyra Micro - ₹9,500 (Compact, 1-5 napkins/cycle)
• Lyra Mini - ₹12,500 (Standard, 5-15 napkins/cycle)

${baseInfo}
      `

    case 'school':
      return `
🏫 **Perfect for Schools & Colleges:**

**Recommended: Push Button Vending Machine - ₹9,000**
✅ No coins needed - completely free for students
✅ 25 napkin capacity
✅ Tamper-proof design
✅ Zero maintenance
✅ Trusted by 50+ schools

**Alternative: Solo Coin - ₹9,500**
✅ ₹5 per napkin (affordable for students)
✅ Self-sustaining revenue model

**For Privacy: Lyra Micro Incinerator - ₹9,500**
✅ Safe disposal in washrooms
✅ No manual handling of waste
✅ CPCB compliant

${baseInfo}

Would you like a detailed quote for your school?
      `

    case 'hospital':
      return `
🏥 **Hospital-Grade Solutions:**

**Recommended: Solo Ethernet - ₹24,500**
✅ 99.9% uptime with wired connection
✅ UPI + coin payments
✅ Cloud analytics & monitoring
✅ Touch screen display
✅ Perfect for high-traffic areas

**For Disposal: Lyra Mini Incinerator - ₹12,500**
✅ 5-15 napkins per cycle
✅ Digital temperature control
✅ Infection-free waste disposal
✅ SWM Rules 2016 compliant

${baseInfo}

Hospital installations include staff training & maintenance support.
      `

    case 'office':
      return `
🏢 **Corporate Office Solutions:**

**Recommended: Solo WiFi - ₹22,500** ⭐ Most Popular
✅ UPI payments (GPay, PhonePe)
✅ No SIM card needed
✅ Real-time analytics
✅ Touch screen interface
✅ Perfect for modern offices

**Budget Option: Solo Coin - ₹9,500**  
✅ Simple coin operation
✅ Reliable & proven
✅ Low maintenance

**For Small Offices: Solo QR - ₹15,000**
✅ UPI payments only
✅ Compact design
✅ SIM-based connectivity

${baseInfo}

Corporate packages include bulk discounts & annual maintenance.
      `

    case 'incinerator':
      return `
🔥 **Safe Waste Disposal Solutions:**

**Lyra Micro - ₹9,500**
✅ Compact (520×230×230 mm)
✅ 1-5 napkins per cycle
✅ Up to 100 napkins/day
✅ Wall mountable
✅ Perfect for small facilities

**Lyra Mini - ₹12,500**  
✅ Larger capacity (650×330×330 mm)
✅ 5-15 napkins per cycle
✅ Digital temperature display
✅ IoT add-on available
✅ Ideal for colleges & hospitals

**Why Choose Incinerators?**
✅ Complete waste elimination
✅ No odor or infection risk 
✅ CPCB & SWM Rules 2016 compliant
✅ Zero manual handling
✅ Eco-friendly disposal

${baseInfo}

Need help choosing the right capacity?
      `

    default:
      return `
🙏 Thank you for your interest in Lyra Enterprises!

Our expert will assist you with personalized recommendations based on your specific requirements.

${baseInfo}

What specific information can I help you with today?
      `
  }
}