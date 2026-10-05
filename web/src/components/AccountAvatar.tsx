type Props = { name: string; image?: string | null; className?: string };

export default function AccountAvatar({ name, image, className = '' }: Props) {
  return <span className={className} aria-hidden="true">
    {image ? (
      // OAuth profile photos and uploaded data URLs do not have fixed image dimensions.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt="" referrerPolicy="no-referrer" onLoad={(event) => { event.currentTarget.style.display = ''; }} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
    ) : null}
    <span>{name.trim().charAt(0).toUpperCase() || '?'}</span>
  </span>;
}
