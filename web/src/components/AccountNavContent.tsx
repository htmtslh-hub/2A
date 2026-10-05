import AccountAvatar from './AccountAvatar';

export default function AccountNavContent({ name, image }: { name: string; image?: string | null }) {
  return <span className="island-account">
    <AccountAvatar name={name} image={image} className="island-account__avatar" />
    <span className="island-account__name">{name}</span>
  </span>;
}
