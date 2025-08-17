export const escapeMarkdown = (text: string): string => {
  return text
    .replace(/_/g, "\\_")   // underscore
    .replace(/-/g, "\\-")   // dash
    // .replace(/\*/g, "\\*")  // asterisk
    .replace(/\[/g, "\\[")  // left square bracket
    .replace(/`/g, "\\`")   // backtick
    .replace(/\./g, "\\.")  // period / dot
    .replace(/!/g, "\\!")   // exclamation mark
    .replace(/\(/g, "\\(")  // left parenthesis
    .replace(/\)/g, "\\)")// right parenthesis
    .replace(/\+/g, "\\+"); //plus
}
