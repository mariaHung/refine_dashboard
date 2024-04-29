import { getNameInitials } from "@/utilities";
import { Avatar as  AntdAvatar } from "antd"
import { AvatarProps } from "antd/lib"

type Props = AvatarProps & {
    name?: string;
}

export const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
        alt={name}
        size="small"
        style={{
            background: '#87d068',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            ...style
        }}
        {...rest}
    >
        {getNameInitials(name || '')}
    </AntdAvatar>
  )
}