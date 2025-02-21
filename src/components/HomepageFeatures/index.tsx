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
        Keep one manuscript for all formats!<br />
        Written in <a href="https://ejs.co/" target="_build">Markdown</a>.<br /> Wrapped in <a href="https://ejs.co/" target="_build">EJS (Embedded Javascript Syntax)</a>.
      </>
    ),
  },
  {
    title: 'Custom Pipelines',
    Svg: require('@site/static/img/undraw_pipeline.svg').default,
    description: (
      <>
        Build any format you want by stacking stages together into different build pipelines.
      </>
    ),
  },
  {
    title: 'Custom Stages',
    Svg: require('@site/static/img/undraw_stages-pipe.svg').default,
    description: (
      <>
        Transform your manuscript any way you like by creating your own custom stage.
      </>
    ),
  },
  {
    title: 'Dev Mode',
    Svg: require('@site/static/img/undraw_data-processing_dev-mode-2.svg').default,
    description: (
      <>
        View the final pipeline result in real time (via browser) as you edit your manuscript.
      </>
    ),
  },
  {
    title: 'Settings & Config',
    Svg: require('@site/static/img/undraw_customize.svg').default,
    description: (
      <>
         Use <a href="https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started" target="_blank">YAML</a> to define global, pipeline, or stage based meta and configurations.
      </>
    ),
  },
  {
    title: 'Scaffold a New Book Project',
    Svg: require('@site/static/img/undraw_new-project.svg').default,
    description: (
      <>
        Spin up a new bookpub project with a single command that includes all the boilerplate.
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
