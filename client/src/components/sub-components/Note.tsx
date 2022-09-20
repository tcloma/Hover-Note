import '../../styles/components/sub-components/Note.scss'

type Props = {
   title: string,
   content: string
}

const Note = ({ title, content }: Props) => {
   return (
      <div className="note">
         <h1>{title}</h1>
         <p>{content}</p>
      </div>
   )
}

export default Note