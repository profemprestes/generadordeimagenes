import { describe, expect, it } from 'vitest';
import { parseDocFile, resolveCodeSnippet, toClientPagesDocs } from '@/lib/docs-contenido';

const DOC = `# Contacto

> **URL:** \`/contacto\`

| Componente | Path Relativa | Rol |
| ContactHero | \`src/components/contacto/ContactHero.tsx\` | Hero |
| ServiceCards | \`src/components/contacto/ServiceCards.tsx\` | Cards |

## 1. ContactHero

\`\`\`tsx
<section><HeroProceduralBackground variant="contact" /></section>
\`\`\`

## 2. ServiceCards

\`\`\`tsx
<div className="grid">cards</div>
\`\`\`
`;

async function parseFixture() {
  const page = await parseDocFile('contacto.md', DOC);
  if (!page) throw new Error('parseDocFile devolvió null');
  return page;
}

describe('toClientPagesDocs', () => {
  it('elimina rawSnippet y conserva los targetCodeSnippet de los slots', async () => {
    const page = await parseFixture();
    expect(page.sections.every((s) => s.rawSnippet)).toBe(true);

    const [clientPage] = toClientPagesDocs([page]);

    for (const section of clientPage.sections) {
      expect(section).not.toHaveProperty('rawSnippet');
    }
    const hero = clientPage.sections.find((s) => s.id === 'contacthero');
    expect(hero?.visualSlots.find((s) => s.id === 'hud-dispatch-moto')?.targetCodeSnippet).toBeTruthy();
  });
});

describe('resolveCodeSnippet', () => {
  it('usa el targetCodeSnippet del slot cuando existe', async () => {
    const page = await parseFixture();
    const hero = page.sections.find((s) => s.id === 'contacthero')!;
    const hud = hero.visualSlots.find((s) => s.id === 'hud-dispatch-moto')!;

    expect(resolveCodeSnippet(hero, hud)).toBe(hud.targetCodeSnippet);
  });

  it('cae en el rawSnippet de la sección si el slot no tiene snippet', async () => {
    const page = await parseFixture();
    const cards = page.sections.find((s) => s.id === 'servicecards')!;
    const bento = cards.visualSlots.find((s) => s.id === 'bento-grid-full')!;

    expect(bento.targetCodeSnippet).toBeUndefined();
    expect(resolveCodeSnippet(cards, bento)).toBe('<div className="grid">cards</div>');
    expect(resolveCodeSnippet(cards, null)).toBe('<div className="grid">cards</div>');
  });
});
