export function cleanContent(content: string): string {
  // Remove images
  content = content.replace(/!\[.*?\]$$.*?$$/g, '')
  
  content = content.replace(/::: \{sanitized[^}]+\}/g, '')

  // Replace links with just the alt text
  content = content.replace(/\[([^\]]+)\]$$[^$$]+\)/g, '$1')

  // Remove sanitized tags and their content
  content = content.replace(/:::\s*{[^}]*}[\s\S]*?:::/g, '')

  // Remove Markdown headers
  content = content.replace(/^#+\s+.*$/gm, '')

  // Remove numbered list formatting
  content = content.replace(/^\d+\.\s+/gm, '')

  // Trim whitespace and remove extra newlines
  content = content.trim().replace(/\n{3,}/g, '\n\n')

  return content
}

