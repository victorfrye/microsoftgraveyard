'use client';

import { Text, Link, Image } from "@fluentui/react-components";

interface ISocial {
    href: string;
    image: JSX.Element;
}

export default function Footer() {
    const _today: Date = new Date();

    const socialDetails: ISocial[] = [
        {
            href: "https://threads.net/@microsoftgraveyard",
            image: <Image src="/images/threads.svg" alt="Threads" height={20} width={20} />
        },
        {
            href: "https://github.com/victorfrye/microsoftgraveyard",
            image: <Image src="/images/github.svg" alt="GitHub" height={20} width={20} />
        }
    ];

    const renderSocialButtons = (): JSX.Element[] => {
        return socialDetails.map((social, index) =>
            <Link href={social.href} target="_blank" rel="noreferrer noopener" className="btn-link btn-social" key={index} slot="button">
                {social.image}
            </Link>
        );
    }

    return (
        <footer className="d-flex justify-content-end mt-auto p-3">

            <div className="d-flex justify-content-center align-items-center p-3 my-3">
                <Image src="/images/headstone.svg" alt="a headstone icon of Microsoft Graveyard" height={72} width={72} />
                <Text as="h2" weight="bold" className="d-block text-primary">Microsoft Graveyard</Text>
            </div>

            <div className="d-flex flex-row flex-nowrap gap-3 p-0 pb-3">
                {renderSocialButtons()}
            </div>

            <div className="d-flex flex-column justify-content-center text-center pt-3" style={{ maxWidth: "90%", width: "60rem" }}>
                <Text as="p" align="center" >
                    Microsoft Graveyard is the virtual graveyard for all products killed by Microsoft;
                    a free and open source collection of dead Microsoft products built by a passionate and nostalgic community.
                    Our objective as a community is to provide factual, historic information for the products listed here.
                    
                </Text>

                <Text as="p" align="center">
                    If something is missing, inaccurate, or you have a suggestion, visit and contribute to the <Link href="https://github.com/victorfrye/microsoftgraveyard" target="_blank" rel="noreferrer noopener">project on GitHub</Link>.
                    Created by <Link href="https://victorfrye.com" target="_blank" rel="noreferrer noopener">Victor Frye</Link>.</Text>

                <Text as="p" align="center" weight="bold">This site is NOT affiliated with Microsoft in any way.</Text>

                <Text as="p" align="center">The Microsoft Graveyard project was inspired by the <Link href="https://killedbygoogle.com/" target="_blank" rel="noreferrer noopener">Killed by Google</Link> project</Text>

                <Text as="p" align="center" >© Victor Frye {_today.getFullYear()}</Text>
            </div>
        </footer>
    )
}
