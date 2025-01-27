import { Zap, Wifi, Cpu } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-12 text-primary glow">{t('features.title')}</h2>
        <div className="grid gap-12 md:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-12 w-12 mb-4 text-primary float" />}
            title={t('features.fastFlashing.title')}
            description={t('features.fastFlashing.description')}
          />
          <FeatureCard
            icon={<Wifi className="h-12 w-12 mb-4 text-primary float" />}
            title={t('features.webBased.title')}
            description={t('features.webBased.description')}
          />
          <FeatureCard
            icon={<Cpu className="h-12 w-12 mb-4 text-primary float" />}
            title={t('features.multipleBoards.title')}
            description={t('features.multipleBoards.description')}
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-colors group">
      <div className="transform transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-bold mb-3 text-primary glow">{title}</h3>
      <p className="text-sm text-foreground/80">{description}</p>
    </div>
  )
}
