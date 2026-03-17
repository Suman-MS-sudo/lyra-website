/**
 * Tawk.to Configuration Helper
 * 
 * This script helps update Tawk.to property ID after account setup
 */

const fs = require('fs')
const path = require('path')

// Get property ID and widget ID from command line arguments
const propertyId = process.argv[2]
const widgetId = process.argv[3]

if (!propertyId || !widgetId) {
    console.log('❌ Usage: node update-tawk-config.js PROPERTY_ID WIDGET_ID')
    console.log('\n📍 Find your IDs in Tawk.to dashboard:')
    console.log('   Administration > Chat Widget')
    console.log('   Example: https://embed.tawk.to/63f1a4b431ebfa0fe7f4dc85/1gqm7n8o2')
    console.log('            Property ID ↗️                    Widget ID ↗️')
    process.exit(1)
}

const tawkFilePath = path.join(__dirname, 'src', 'components', 'TawkToChat.tsx')

try {
    // Read the current TawkToChat.tsx file
    let fileContent = fs.readFileSync(tawkFilePath, 'utf8')
    
    // Replace the placeholder IDs with actual IDs
    const newScriptSrc = `https://embed.tawk.to/${propertyId}/${widgetId}`
    fileContent = fileContent.replace(
        /script\.src = ['"`]https:\/\/embed\.tawk\.to\/[^'">`]*['"`]/,
        `script.src = '${newScriptSrc}'`
    )
    
    // Write the updated file
    fs.writeFileSync(tawkFilePath, fileContent, 'utf8')
    
    console.log('✅ Tawk.to configuration updated successfully!')
    console.log(`📍 Property ID: ${propertyId}`)
    console.log(`🔧 Widget ID: ${widgetId}`)
    console.log(`🌐 Script URL: ${newScriptSrc}`)
    console.log('\n🚀 Next steps:')
    console.log('1. Restart your development server')
    console.log('2. Test the chat widget on your website')
    console.log('3. Configure auto-responses in Tawk.to dashboard')
    console.log('4. Set up team availability hours')
    
} catch (error) {
    console.error('❌ Error updating configuration:', error.message)
    process.exit(1)
}