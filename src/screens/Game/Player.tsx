const Player = ({ emoji = '&#128054;' }: { emoji?: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: emoji }} />
}

export default Player
