interface ServiceCardProps {
  title: string
  description: string
  icon?: string
  badge?: string
}

export default function ServiceCard({ title, description, icon, badge }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200 group">
      {icon && (
        <div className="text-4xl mb-4">{icon}</div>
      )}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-dark group-hover:text-primary transition-colors">
          {title}
        </h3>
        {badge && (
          <span className="text-xs font-medium bg-secondary text-primary px-2.5 py-1 rounded-full ml-2 shrink-0">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-500 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  )
}
