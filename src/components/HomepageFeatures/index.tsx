import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

// Homepage Feature Section
const FeatureList: FeatureItem[] = [
  {
    title: 'One Manuscript Source',
    Svg: require('@site/static/img/undraw_manuscript-src.svg').default,
    description: (
      <>
        Manuscript written in Markdown, wrapped in <a href="https://ejs.co/">EJS (Embedded Javascript Syntax)</a>.
      </>
    ),
  },
  {
    title: 'Dev Mode',
    Svg: require('@site/static/img/undraw_read-dev-mode.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Override & Extend',
    Svg: require('@site/static/img/undraw_stages-choices.svg').default,
    description: (
      <>
        bookpub allows you to override pre-built stages or pipelines.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
