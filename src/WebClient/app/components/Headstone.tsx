import {
  Card,
  CardHeader,
  Button,
  Image,
  tokens,
  makeStyles,
  Skeleton,
  SkeletonItem,
  Body1,
  Subtitle1,
} from '@fluentui/react-components';
import { News16Regular } from '@fluentui/react-icons';
import useCorpse from '@microsoftgraveyard/hooks/useCorpse';
import { Corpse } from '@microsoftgraveyard/types/corpse';
import { FC } from 'react';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  skeletonImage: {
    height: '72px',
    width: '72px',
  },
  skeletonAction: {
    height: '16px',
    width: '16px',
  },
  skeletonFirstRow: {
    alignItems: 'center',
    display: 'grid',
    paddingTop: '10px',
    paddingBottom: '10px',
    position: 'relative',
    gap: '10px',
    gridTemplateColumns: '20% 15% 30% 25% min-content',
  },
  skeletonSecondRow: {
    alignItems: 'center',
    display: 'grid',
    paddingBottom: '10px',
    position: 'relative',
    gap: '10px',
    gridTemplateColumns: '15% 30% 20% min-content 20%',
  },
  skeletonThirdRow: {
    alignItems: 'center',
    display: 'grid',
    paddingBottom: '10px',
    position: 'relative',
    gap: '10px',
    gridTemplateColumns: '10% 15% 20% 35% min-content',
  },
  title: {
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone}`,
  },
  lifeDates: {
    color: tokens.colorBrandForeground2,
    lineHeight: tokens.lineHeightBase200,
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone}`,
  },
});

interface HeadstoneProps {
  corpse: Corpse;
  today: Date;
}

const Headstone: FC<HeadstoneProps> = ({ corpse, today }) => {
  const styles = useStyles();
  const { name, lifeDates, obituary, isDead, loading } = useCorpse(
    corpse,
    today
  );

  return (
    <Card appearance="filled-alternative" className={styles.container}>
      {loading ? (
        <Skeleton aria-label="Loading headstone">
          <CardHeader
            image={
              <SkeletonItem shape="circle" className={styles.skeletonImage} />
            }
            header={<SkeletonItem size={20} className={styles.title} />}
            description={
              <SkeletonItem size={16} className={styles.lifeDates} />
            }
            action={
              <SkeletonItem
                shape="square"
                size={24}
                className={styles.skeletonAction}
              />
            }
          />
          <div className={styles.skeletonFirstRow}>
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
          </div>
          <div className={styles.skeletonSecondRow}>
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
          </div>
          <div className={styles.skeletonThirdRow}>
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} />
          </div>
        </Skeleton>
      ) : (
        <>
          <CardHeader
            image={
              <Image
                src={isDead ? '/images/headstone.svg' : '/images/coffin.svg'}
                alt="a headstone for that which is dead"
                height={72}
                width={72}
              />
            }
            header={
              <Subtitle1 as="h2" block className={styles.title}>
                {name}
              </Subtitle1>
            }
            description={
              <Body1 as="p" className={styles.lifeDates}>
                {lifeDates}
              </Body1>
            }
            action={
              <Button
                as="a"
                icon={<News16Regular />}
                appearance="subtle"
                href={corpse.link}
                target="_blank"
                rel="noreferrer noopener"
              />
            }
          />
          <Body1 as="p">{obituary}</Body1>
        </>
      )}
    </Card>
  );
};

export default Headstone;
