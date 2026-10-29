import type { Category } from '../data/site'

export function CategoryTile({ category }: { readonly category: Category }) {
  return (
    <a
      className={`category category--${category.theme}`}
      href={category.href}
      style={{
        background: `url("${category.image}") center / cover, linear-gradient(135deg, var(--cover-a), var(--cover-b))`,
      }}
    >
      <span className="category__body">
        <span className="category__label">{category.label}</span>
        <span className="category__count">{category.count}</span>
      </span>
    </a>
  )
}
