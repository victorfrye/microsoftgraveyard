import { Avatar } from "@fluentui/react-components";

export default function ProfileAvatar(): JSX.Element {
    return (
        <Avatar
            image={{ src: "/images/headstone.svg", alt: "a headstone icon of Microsoft Graveyard" }}
            color="neutral"
            name="Microsoft Graveyard"
            active="active"
            activeAppearance="ring-shadow"
            size={72}
        />
    )
}
