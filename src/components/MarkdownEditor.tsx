import React, { useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { langs } from '@uiw/codemirror-extensions-langs'

type Props = {
   value: any,
   onChange: any
}

const myTheme = createTheme({
   theme: 'dark',
   settings: {
      background: '#1a202c',
      foreground: '#c9d1d9',
      caret: '#5d00ff',
      selection: '#2c3138',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
      gutterBackground: '#1a202c',
      gutterForeground: '#8a919966',
   },
   styles: [
      { tag: t.comment, color: '#787b8099' },
      { tag: t.variableName, color: '#0080ff' },
      { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: '#5c6166' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#5c6166' },
      { tag: t.operator, color: '#5c6166' },
      { tag: t.className, color: '#5c6166' },
      { tag: t.definition(t.typeName), color: '#5c6166' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.angleBracket, color: '#5c6166' },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' },
      { tag: t.heading1, color: 'red' },
      { tag: t.heading2, color: 'yellow' },
      { tag: t.heading3, color: 'blue' },
      { tag: t.heading4, color: 'green' },
      { tag: t.heading5, color: 'purple' },
      { tag: t.heading6, color: 'teal' }
   ],
});

const MarkdownEditor = ({ value, onChange }: Props) => {

   const onEditorChange = useCallback((value: string) => {
      onChange(value)
   }, [])

   return (
      <CodeMirror
         value={value}
         onChange={onEditorChange}
         height='100%'
         width='100%'
         theme={myTheme}
         extensions={[langs.markdown()]}
         basicSetup={{
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
         }}
      />
   )
}

export default MarkdownEditor