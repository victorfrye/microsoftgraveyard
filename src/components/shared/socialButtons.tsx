import { Image, Link, makeStyles, shorthands, tokens } from "@fluentui/react-components";

interface ISocial {
    href: string;
    image: JSX.Element;
}

const useStyles = makeStyles({
    socialButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...shorthands.gap(tokens.spacingVerticalL),
        ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalNone, tokens.spacingVerticalL, tokens.spacingHorizontalNone),
    }
});

const SocialButtons = () => {
    const styles = useStyles();

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
        <div className={styles.socialButtons}>
            {renderSocialButtons()}
        </div>  
    )
}

export default SocialButtons;
