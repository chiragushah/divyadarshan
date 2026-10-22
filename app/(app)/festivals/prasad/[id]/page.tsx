import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChefHat, Clock, Users, Flame, Lightbulb, MapPin, Scale, BookOpen, Wrench, ListChecks, AlertTriangle, Shuffle, Archive, UtensilsCrossed, Eye } from 'lucide-react'
import { FESTIVALS, getFestival } from '@/lib/data/festivals'
import { PRASAD_RECIPES, getRecipe, getVariant, festivalsFor, recipeHref } from '@/lib/data/prasad'
import { dietFor, DIET_LABEL } from '@/lib/data/prasad/diet'
import { shlokasFor } from '@/lib/data/prasad/shlokas'
import { baseServings } from '@/lib/prasad/scale'
import RecipeKit from '@/components/prasad/RecipeKit'
import BasketLink from '@/components/prasad/BasketLink'
import ShlokaCard from '@/components/prasad/ShlokaCard'
import FamilyVersions from '@/components/prasad/FamilyVersions'

interface Props {
  params: { id: string }
  searchParams: { v?: string; from?: string }
}

export function generateStaticParams() {
  return PRASAD_RECIPES.map(r => ({ id: r.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const r = getRecipe(params.id)
  if (!r) return { title: 'Prasad recipe — DivyaDarshanam' }
  const regions = r.variants.map(v => v.region).slice(0, 3).join(', ')
  return {
    title: `${r.name} recipe — made differently by state and tradition | DivyaDarshanam`,
    description: `${r.summary} Full recipes for ${regions}${r.variants.length > 3 ? ' and more' : ''}.`,
  }
}

export default function PrasadRecipePage({ params, searchParams }: Props) {
  const recipe = getRecipe(params.id)
  if (!recipe) notFound()

  const variant = getVariant(recipe, searchParams.v)
  const fromFestival = searchParams.from ? getFestival(searchParams.from) : undefined
  const accent = fromFestival?.accent || '#8B1A1A'

  const offeredAt = festivalsFor(recipe.id)
    .map(x => ({ f: FESTIVALS.find(f => f.slug === x.festival), variant: x.variant }))
    .filter((x): x is { f: (typeof FESTIVALS)[number]; variant: string | undefined } => !!x.f)

  // One row per festival (a festival may reference several variants of the dish).
  const seen = new Set<string>()
  const festivalRows = offeredAt.filter(x => (seen.has(x.f.slug) ? false : (seen.add(x.f.slug), true)))

  const groups = offeredAt.map(x => x.f.deityGroup)
  const shlokas = shlokasFor(groups, fromFestival?.deityGroup)
  const tags = dietFor(recipe.id, variant.id)
  const steps = variant.method.map(st => (typeof st === 'string' ? { title: '', text: st } : st))

  const backHref = fromFestival ? `/festivals/${fromFestival.slug}` : '/festivals/prasad'
  const backLabel = fromFestival ? fromFestival.name : 'All prasad recipes'

  return (
    <div>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}d9 100%)`, color: 'white' }}>
        <div className="max-w-5xl mx-auto" style={{ padding: '28px 24px 44px' }}>
          <Link href={backHref} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
            <ArrowLeft size={15} /> {backLabel}
          </Link>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.9 }}>
            Prasad recipe · {recipe.category}
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 600, lineHeight: 1.1, marginTop: 6, color: 'white' }}>
            {recipe.name}
          </h1>
          {recipe.alsoCalled && <p style={{ fontSize: 15, opacity: 0.9, marginTop: 6, fontStyle: 'italic' }}>{recipe.alsoCalled}</p>}
          <p style={{ fontSize: 16, maxWidth: 700, lineHeight: 1.7, marginTop: 14, color: 'rgba(255,255,255,0.94)' }}>{recipe.summary}</p>
          <div style={{ marginTop: 16 }}><BasketLink light /></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Why it differs */}
        <div className="card card-p" style={{ marginTop: -26, marginBottom: 24 }}>
          <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Why this prasad is made differently</h2>
          <p style={{ fontSize: 15, color: 'var(--ink2)', lineHeight: 1.8, margin: 0 }}>{recipe.meaning}</p>
        </div>

        {/* Variant picker */}
        <div style={{ marginBottom: 22 }}>
          <div className="section-title" style={{ marginBottom: 10 }}>
            Choose your state or tradition ({recipe.variants.length} {recipe.variants.length === 1 ? 'version' : 'versions'})
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} role="tablist" aria-label="Regional versions">
            {recipe.variants.map(v => {
              const active = v.id === variant.id
              return (
                <Link
                  key={v.id}
                  href={recipeHref(recipe.id, v.id, fromFestival?.slug)}
                  scroll={false}
                  role="tab"
                  aria-selected={active}
                  style={{
                    textDecoration: 'none',
                    padding: '9px 16px',
                    borderRadius: 100,
                    fontSize: 13.5,
                    fontWeight: 600,
                    border: `1.5px solid ${active ? accent : 'var(--ivory3)'}`,
                    background: active ? accent : 'white',
                    color: active ? 'white' : 'var(--ink2)',
                  }}
                >
                  {v.region}
                </Link>
              )
            })}
          </div>
        </div>

        {/* The recipe */}
        <article className="card card-p" style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: accent, background: `${accent}12`, border: `1px solid ${accent}33`, borderRadius: 100, padding: '3px 11px' }}>
              <MapPin size={12} /> {variant.region}
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{variant.culture}</span>
          </div>
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {tags.map(t => (
                <span key={t} style={{ fontSize: 11.5, fontWeight: 700, color: '#166534', background: '#16653412', border: '1px solid #16653433', borderRadius: 100, padding: '2px 9px' }}>{DIET_LABEL[t]}</span>
              ))}
            </div>
          )}
          <h2 className="font-serif" style={{ fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 600, marginBottom: 10 }}>{variant.title}</h2>
          <p style={{ fontSize: 15.5, color: 'var(--ink2)', lineHeight: 1.8, marginBottom: 20 }}>{variant.intro}</p>

          {variant.story && (
            <div style={{ marginBottom: 24 }}>
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={18} style={{ color: accent }} /> About this version
              </h3>
              {variant.story.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize: 15, color: 'var(--ink2)', lineHeight: 1.8, margin: '0 0 12px' }}>{para}</p>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 26 }}>
            <Meta icon={<Users size={16} />} label="Serves" value={variant.serves} accent={accent} />
            <Meta icon={<Clock size={16} />} label="Prep" value={variant.prep} accent={accent} />
            <Meta icon={<ChefHat size={16} />} label="Cook" value={variant.cook} accent={accent} />
          </div>

          {variant.equipment && variant.equipment.length > 0 && (
            <div style={{ marginBottom: 26 }}>
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Wrench size={18} style={{ color: accent }} /> Equipment
              </h3>
              <NoteList items={variant.equipment} accent={accent} />
            </div>
          )}

          <RecipeKit
            dish={recipe.id}
            variantId={variant.id}
            title={`${recipe.name} · ${variant.region.split(' (')[0]}`}
            region={variant.region}
            accent={accent}
            serves={variant.serves}
            baseServes={baseServings(variant.serves)}
            ingredients={variant.ingredients}
            mise={variant.mise || []}
            steps={steps}
            offering={variant.offering}
            ritual={variant.ritual || []}
          />

          {variant.mise && variant.mise.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <ListChecks size={18} style={{ color: accent }} /> Before you start
              </h3>
              <NoteList items={variant.mise} accent={accent} />
            </div>
          )}

          <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChefHat size={18} style={{ color: accent }} /> Method
          </h3>
          <ol style={{ listStyle: 'none', margin: '0 0 28px', padding: 0 }}>
            {variant.method.map((st, i) => {
              const d = typeof st === 'string' ? { title: '', text: st, why: undefined, cue: undefined } : st
              return (
                <li key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < variant.method.length - 1 ? 20 : 0 }}>
                  <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {d.title && <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 4, paddingTop: 3 }}>{d.title}</div>}
                    <div style={{ fontSize: 14.5, color: 'var(--ink2)', lineHeight: 1.75, paddingTop: d.title ? 0 : 3 }}>{d.text}</div>
                    {d.why && (
                      <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, marginTop: 8 }}>
                        <strong style={{ color: 'var(--ink2)' }}>Why: </strong>{d.why}
                      </div>
                    )}
                    {d.cue && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.6, marginTop: 8, background: `${accent}0d`, borderRadius: 8, padding: '8px 12px' }}>
                        <Eye size={15} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                        <span><strong>You’ll know it’s right when: </strong>{d.cue}</span>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          <div style={{ background: `${accent}0d`, borderLeft: `4px solid ${accent}`, borderRadius: 10, padding: '14px 18px', marginBottom: 22 }}>
            <div className="section-title" style={{ marginBottom: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Flame size={14} style={{ color: accent }} /> How it is offered
            </div>
            <p style={{ fontSize: 14.5, color: 'var(--ink2)', lineHeight: 1.75, margin: 0 }}>{variant.offering}</p>
            {variant.ritual && variant.ritual.length > 0 && (
              <ol style={{ margin: '12px 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {variant.ritual.map((r, i) => (
                  <li key={i} style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7 }}>{r}</li>
                ))}
              </ol>
            )}
          </div>

          {shlokas && <ShlokaCard set={shlokas} accent={accent} deityLabel={fromFestival ? fromFestival.deity.split(/[;(]/)[0].trim() : undefined} />}

          {(variant.serving || variant.storage) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 24 }}>
              {variant.serving && (
                <div style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)', borderRadius: 12, padding: 16 }}>
                  <div className="section-title" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}><UtensilsCrossed size={14} style={{ color: accent }} /> Serving</div>
                  <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, margin: 0 }}>{variant.serving}</p>
                </div>
              )}
              {variant.storage && (
                <div style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)', borderRadius: 12, padding: 16 }}>
                  <div className="section-title" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}><Archive size={14} style={{ color: accent }} /> Storage</div>
                  <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, margin: 0 }}>{variant.storage}</p>
                </div>
              )}
            </div>
          )}

          {variant.troubleshooting && variant.troubleshooting.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={18} style={{ color: accent }} /> If something goes wrong
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {variant.troubleshooting.map((t, i) => (
                  <div key={i} style={{ border: '1px solid var(--ivory3)', borderRadius: 10, padding: '11px 14px' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{t.problem}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.65 }}>{t.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {variant.variations && variant.variations.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shuffle size={18} style={{ color: accent }} /> Variations &amp; substitutions
              </h3>
              <NoteList items={variant.variations} accent={accent} />
            </div>
          )}

          {variant.tips.length > 0 && (
            <div>
              <div className="section-title" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lightbulb size={14} style={{ color: accent }} /> Cook’s notes
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {variant.tips.map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.65 }}>
                    <span style={{ color: accent, fontWeight: 800, flexShrink: 0 }}>›</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {variant.seeAlso && variant.seeAlso.length > 0 && (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--ivory3)' }}>
              <div className="section-title" style={{ marginBottom: 10 }}>Recipes for the dishes in this offering</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {variant.seeAlso.map((s, i) => (
                  <Link
                    key={i}
                    href={recipeHref(s.dish, s.variant, fromFestival?.slug)}
                    style={{ textDecoration: 'none', padding: '7px 14px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: accent, background: `${accent}12`, border: `1px solid ${accent}33` }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <FamilyVersions dish={recipe.id} variantId={variant.id} variantTitle={variant.title} accent={accent} />
        </article>

        {/* Compare */}
        {recipe.variants.length > 1 && (
          <div className="card card-p" style={{ marginBottom: 28 }}>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
              <span style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 2 }}>How the versions differ</span>
            </h2>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '10px 0 16px' }}>Tap a row to open that version.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recipe.variants.map(v => (
                <Link
                  key={v.id}
                  href={recipeHref(recipe.id, v.id, fromFestival?.slug)}
                  scroll={false}
                  style={{
                    textDecoration: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(150px, 220px) 1fr',
                    gap: 14,
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: `1.5px solid ${v.id === variant.id ? accent : 'var(--ivory3)'}`,
                    background: v.id === variant.id ? `${accent}0a` : 'var(--ivory2)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: accent }}>{v.region}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{v.title}</div>
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.6 }}>{v.differs || v.intro.split('. ')[0] + '.'}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Where it is offered */}
        {festivalRows.length > 0 && (
          <div className="card card-p" style={{ marginBottom: 28 }}>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 14 }}>
              <span style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 2 }}>Festivals where it is offered</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {festivalRows.map(({ f }) => (
                <Link
                  key={f.slug}
                  href={`/festivals/${f.slug}`}
                  style={{ textDecoration: 'none', padding: '8px 14px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: 'var(--ink2)', background: 'white', border: `1.5px solid ${f.accent}55` }}
                >
                  {f.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <p style={{ fontSize: 12.5, color: 'var(--muted2)', lineHeight: 1.6, marginBottom: 20 }}>
          Quantities are for home kitchens and are a starting point — temple and family recipes vary, and many are passed down by taste rather than measure. Please follow your own family’s or temple’s custom, and check ingredients for allergies.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/festivals/prasad" className="btn btn-secondary">All prasad recipes</Link>
          <Link href="/festivals" className="btn btn-primary">All festivals</Link>
        </div>
      </div>
    </div>
  )
}

function NoteList({ items, accent, dense }: { items: string[]; accent: string; dense?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: dense ? 9 : 8 }}>
      {items.map((it, i) => {
        const k = it.indexOf(' — ')
        const main = k > -1 ? it.slice(0, k) : it
        const note = k > -1 ? it.slice(k + 3) : ''
        return (
          <li key={i} style={{ display: 'flex', gap: 9, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6 }}>
            <span aria-hidden style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0, marginTop: 9 }} />
            <span>
              <span style={{ color: 'var(--ink)' }}>{main}</span>
              {note && <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginTop: 1 }}>{note}</span>}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function Meta({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent: string }) {
  return (
    <div style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)', borderRadius: 12, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent, fontSize: 11.5, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{value}</div>
    </div>
  )
}
