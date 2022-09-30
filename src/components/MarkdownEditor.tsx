import React, {useCallback} from 'react'
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
      background: '#22272e',
      foreground: '#75baff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
      gutterBackground: '#22272e',
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