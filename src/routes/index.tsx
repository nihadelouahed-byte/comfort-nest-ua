import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  Baby,
  BadgeCheck,
  Check,
  ChevronDown,
  CircleDollarSign,
  Heart,
  Instagram,
  MessageCircle,
  MoonStar,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/rahtek-logo.jpg.asset.json";
import heroAsset from "@/assets/pillow-support.jpg.asset.json";
import productAsset from "@/assets/pillow-product.jpg.asset.json";
import showcaseAsset from "@/assets/pillow-showcase.jpg.asset.json";
import usageAsset from "@/assets/pillow-usage.jpg.asset.json";

type Language = "ar" | "fr";

const wilayas = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna", "06 - Béjaïa",
  "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira", "11 - Tamanrasset", "12 - Tébessa",
  "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou", "16 - Alger", "17 - Djelfa", "18 - Jijel",
  "19 - Sétif", "20 - Saïda", "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma",
  "25 - Constantine", "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt",
  "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa",
];

const copy = {
  ar: {
    dir: "rtl", langLabel: "العربية", other: "Français", order: "اطلبي الآن", eyebrow: "راحة تحتضن كل مرحلة",
    title: "تعبتِ من ألم الظهر وصعوبة النوم أثناء الحمل؟",
    intro: "امنحي جسمك الدعم والراحة التي يحتاجها مع وسادة الحمل بتصميم U من Rahtek.",
    delivery: "التوصيل متوفر لجميع الولايات الجزائرية", payment: "الدفع عند الاستلام", price: "3800 دج",
    problemTitle: "لماذا تصبح الراحة والنوم أصعب أثناء الحمل؟",
    problemIntro: "يتغيّر الجسم وتصبح وضعية النوم المريحة أصعب. وسادة Rahtek تساعدك على توزيع الدعم حول الجسم براحة أكبر.",
    problems: ["ألم الظهر", "صعوبة إيجاد وضعية مريحة", "الحاجة إلى دعم البطن", "الضغط أثناء النوم", "دعم الساقين والركبتين"],
    benefitsTitle: "دعم ناعم، من الرأس إلى الساقين",
    benefitsIntro: "تصميم U يحيط بالجسم ليساعدك على الاسترخاء في الوضعية التي تناسبك.",
    benefits: ["دعم الظهر", "دعم البطن", "دعم الساقين والركبتين", "راحة أفضل أثناء النوم", "تصميم U يحيط بالجسم", "مناسب للاستخدام اليومي"],
    afterTitle: "راحتك لا تنتهي بعد الولادة 💙",
    afterText: "يمكن الاستفادة من وسادة الحمل حتى بعد الولادة، لتوفير دعم وراحة أكبر أثناء الجلوس والراحة والنوم.",
    afterNote: "مناسبة للأمهات في مراحل مختلفة، وليس فقط خلال فترة الحمل.",
    howTitle: "كيف تطلبين؟", steps: [
      ["املئي معلوماتك", "الاسم، الولاية، البلدية ورقم الهاتف."],
      ["نؤكد طلبك", "نتواصل معك لتأكيد المعلومات."],
      ["استلمي طلبك", "التوصيل إلى ولايتك والدفع عند الاستلام."],
    ],
    formTitle: "اطلبي وسادة Rahtek الآن", formIntro: "أدخلي معلوماتك وسنتواصل معك لتأكيد الطلب.",
    fullName: "الاسم واللقب", wilaya: "الولاية", commune: "البلدية", phone1: "رقم الهاتف 1", phone2: "رقم الهاتف 2 (اختياري)",
    selectWilaya: "اختاري الولاية", submit: "تأكيد الطلب — 3800 دج", sending: "جارٍ تسجيل الطلب...",
    required: "هذا الحقل مطلوب", invalidPhone: "أدخلي رقمًا جزائريًا صحيحًا من 10 أرقام", error: "تعذر تسجيل الطلب. تحققي من المعلومات وحاولي مرة أخرى.",
    successTitle: "تم تسجيل طلبك بنجاح 💙", successText: "سنتواصل معك لتأكيد الطلب.", another: "تسجيل طلب آخر",
    socialTitle: "تعرفي علينا أكثر 💙", socialText: "للاستشارة والتعرف على منتجات Rahtek. الطلب الأساسي يتم مباشرة عبر الموقع.",
    faqTitle: "أسئلة شائعة", faqs: [
      ["هل التوصيل متوفر لجميع الولايات؟", "نعم، التوصيل متوفر إلى جميع الولايات الجزائرية."],
      ["ما هو سعر المنتج؟", "3800 دج."], ["هل الدفع عند الاستلام؟", "نعم، الدفع يكون عند استلام طلبك."],
      ["هل يمكن استعمال الوسادة بعد الولادة؟", "نعم، يمكن استخدامها بعد الولادة أيضًا لتوفير الراحة والدعم."],
      ["كيف أطلب؟", "املئي نموذج الطلب الموجود في الموقع وسنتواصل معك لتأكيد الطلب."],
    ],
    finalTitle: "جاهزة لراحة أكثر؟ 💙", finalText: "اطلبي وسادة الحمل الآن بسعر 3800 دج", finalButton: "اطلبي الآن — 3800 دج",
    trust: ["الدفع عند الاستلام", "التوصيل لجميع الولايات", "طلب سريع وسهل", "خدمة زبائن عبر WhatsApp", "للحمل وما بعد الولادة"],
    productName: "وسادة الحمل", footerNote: "راحة ودعم في كل مرحلة.", whatsapp: "استشارة عبر WhatsApp",
  },
  fr: {
    dir: "ltr", langLabel: "Français", other: "العربية", order: "Commander maintenant", eyebrow: "Le confort à chaque étape",
    title: "Fatiguée des douleurs au dos et des nuits difficiles pendant la grossesse ?",
    intro: "Offrez à votre corps le soutien et le confort dont il a besoin avec notre coussin de grossesse en U.",
    delivery: "Livraison disponible dans toutes les wilayas d’Algérie", payment: "Paiement à la livraison", price: "3800 DA",
    problemTitle: "Pourquoi le sommeil devient-il plus difficile pendant la grossesse ?",
    problemIntro: "Le corps change et trouver une position confortable devient plus difficile. Le coussin Rahtek aide à mieux soutenir le corps.",
    problems: ["Inconfort du dos", "Position difficile à trouver", "Besoin de soutenir le ventre", "Pression pendant le sommeil", "Soutien des jambes et genoux"],
    benefitsTitle: "Un soutien doux, de la tête aux jambes",
    benefitsIntro: "Sa forme en U entoure le corps et vous aide à trouver une position plus confortable.",
    benefits: ["Soutien du dos", "Soutien du ventre", "Soutien des jambes et genoux", "Plus de confort au repos", "Forme en U enveloppante", "Usage quotidien"],
    afterTitle: "Votre confort ne s'arrête pas après l'accouchement 💙",
    afterText: "Le coussin peut aussi être utilisé après l'accouchement pour plus de soutien et de confort en position assise, au repos ou pendant le sommeil.",
    afterNote: "Adapté aux mamans à différentes étapes, pas seulement pendant la grossesse.",
    howTitle: "Comment commander ?", steps: [
      ["Remplissez vos informations", "Nom, wilaya, commune et numéro de téléphone."],
      ["Nous confirmons", "Nous vous contactons pour vérifier les informations."],
      ["Recevez votre commande", "Livraison dans votre wilaya et paiement à la réception."],
    ],
    formTitle: "Commandez votre coussin Rahtek", formIntro: "Renseignez vos coordonnées, puis nous vous contacterons pour confirmer.",
    fullName: "Nom et prénom", wilaya: "Wilaya", commune: "Commune", phone1: "Téléphone 1", phone2: "Téléphone 2 (facultatif)",
    selectWilaya: "Choisissez votre wilaya", submit: "Confirmer ma commande — 3800 DA", sending: "Enregistrement en cours...",
    required: "Ce champ est obligatoire", invalidPhone: "Saisissez un numéro algérien valide à 10 chiffres", error: "La commande n’a pas pu être enregistrée. Vérifiez vos informations et réessayez.",
    successTitle: "Votre commande a été enregistrée avec succès 💙", successText: "Nous vous contacterons pour confirmer votre commande.", another: "Passer une autre commande",
    socialTitle: "Suivez Rahtek.dz16 💙", socialText: "Pour découvrir nos produits ou demander conseil. Les commandes se font directement sur ce site.",
    faqTitle: "Questions fréquentes", faqs: [
      ["Livrez-vous dans toutes les wilayas ?", "Oui, la livraison est disponible dans toutes les wilayas d’Algérie."],
      ["Quel est le prix ?", "3800 DA."], ["Le paiement se fait-il à la livraison ?", "Oui, vous payez à la réception de votre commande."],
      ["Le coussin peut-il être utilisé après l'accouchement ?", "Oui, il peut aussi offrir confort et soutien après l'accouchement."],
      ["Comment commander ?", "Remplissez le formulaire sur ce site et nous vous contacterons pour confirmer."],
    ],
    finalTitle: "Prête pour plus de confort ? 💙", finalText: "Commandez votre coussin de grossesse maintenant — 3800 DA", finalButton: "Commander — 3800 DA",
    trust: ["Paiement à la livraison", "Livraison dans 58 wilayas", "Commande simple et rapide", "Conseil via WhatsApp", "Grossesse et après"],
    productName: "Coussin de grossesse", footerNote: "Confort et soutien à chaque étape.", whatsapp: "Conseil sur WhatsApp",
  },
} as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coussin de grossesse en U — Rahtek.dz16" },
      { name: "description", content: "Commandez le coussin de grossesse Rahtek à 3800 DA. Livraison dans toute l’Algérie et paiement à la livraison." },
      { property: "og:title", content: "Coussin de grossesse en U — Rahtek.dz16" },
      { property: "og:description", content: "Confort et soutien pendant la grossesse et après. Livraison dans les 58 wilayas." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: "Coussin de grossesse Rahtek", brand: { "@type": "Brand", name: "Rahtek.dz16" }, offers: { "@type": "Offer", price: "3800", priceCurrency: "DZD", availability: "https://schema.org/InStock" } }) }],
  }),
  component: LandingPage,
});

function LandingPage() {
  const [language, setLanguage] = useState<Language>("ar");
  const t = copy[language];
  const scrollToOrder = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div lang={language} dir={t.dir} className="min-h-screen overflow-x-hidden bg-background pb-20 text-foreground md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Rahtek.dz16">
            <img src={logoAsset.url} alt="Rahtek" className="size-10 rounded-xl object-cover" />
            <span className="hidden font-display text-lg font-extrabold text-foreground min-[360px]:inline">Rahtek.dz16</span>
          </a>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-border bg-card p-1 text-xs font-bold" aria-label="Language">
              <button type="button" onClick={() => setLanguage("ar")} className={`rounded-full px-3 py-1.5 transition ${language === "ar" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>العربية</button>
              <button type="button" onClick={() => setLanguage("fr")} className={`rounded-full px-3 py-1.5 transition ${language === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>Français</button>
            </div>
            <Button variant="order" size="sm" onClick={scrollToOrder} className="hidden sm:inline-flex">{t.order}</Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-hero">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div className="z-10 max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-highlight px-4 py-2 text-sm font-bold text-highlight-foreground"><Sparkles className="size-4" />{t.eyebrow}</p>
              <h1 className="text-balance font-display text-4xl font-black leading-[1.15] sm:text-5xl lg:text-6xl">{t.title}</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">{t.intro}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <strong className="font-display text-4xl text-primary-strong">{t.price}</strong>
                <span className="rounded-full bg-card px-3 py-2 text-sm font-bold shadow-soft"><CircleDollarSign className="me-1 inline size-4 text-primary" />{t.payment}</span>
              </div>
              <p className="mt-4 flex items-center gap-2 font-semibold"><Truck className="size-5 text-primary" />{t.delivery}</p>
              <Button variant="order" size="lg" onClick={scrollToOrder} className="mt-7 w-full sm:w-auto">{t.order}<ArrowDown className="size-5" /></Button>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {t.trust.slice(0, 3).map((item) => <span key={item} className="flex items-center gap-1.5"><Check className="size-4 text-primary" />{item}</span>)}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-highlight/65 blur-2xl" />
              <img src={heroAsset.url} alt={language === "ar" ? "وسادة الحمل Rahtek بتصميم U" : "Coussin de grossesse Rahtek en U"} className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-center shadow-image" />
              <div className="absolute bottom-4 start-4 rounded-2xl bg-card/95 px-4 py-3 shadow-soft backdrop-blur"><p className="text-xs font-bold text-muted-foreground">Rahtek.dz16</p><p className="font-display text-xl font-black">{t.productName}</p></div>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center"><SectionMark icon={MoonStar} /><h2 className="section-title">{t.problemTitle}</h2><p className="section-copy">{t.problemIntro}</p></div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{t.problems.map((item, i) => <div key={item} className="flex min-h-28 items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-highlight font-black text-highlight-foreground">{i + 1}</span><span className="font-bold">{item}</span></div>)}</div>
          </div>
        </section>

        <section className="bg-soft py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3"><img src={productAsset.url} alt={t.productName} className="col-span-2 aspect-[16/10] w-full rounded-3xl object-cover shadow-image" /><img src={showcaseAsset.url} alt={t.productName} className="aspect-square w-full rounded-2xl object-cover shadow-soft" /><img src={usageAsset.url} alt={t.productName} className="aspect-square w-full rounded-2xl object-cover shadow-soft" /></div>
            <div><SectionMark icon={Heart} /><h2 className="section-title text-start">{t.benefitsTitle}</h2><p className="section-copy text-start">{t.benefitsIntro}</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{t.benefits.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft"><Check className="size-5 text-primary-strong" /></span><span className="font-bold">{item}</span></div>)}</div></div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <img src={usageAsset.url} alt={t.afterTitle} className="aspect-square w-full rounded-[2rem] object-cover shadow-image" />
            <div><SectionMark icon={Baby} /><h2 className="section-title text-start">{t.afterTitle}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{t.afterText}</p><p className="mt-5 rounded-2xl bg-highlight p-5 font-bold text-highlight-foreground">{t.afterNote}</p></div>
          </div>
        </section>

        <section className="bg-soft py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6"><div className="text-center"><SectionMark icon={PackageCheck} /><h2 className="section-title">{t.howTitle}</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{t.steps.map(([title, text], i) => <div key={title} className="rounded-3xl bg-card p-7 shadow-soft"><span className="font-display text-5xl font-black text-primary-soft-strong">0{i + 1}</span><h3 className="mt-5 text-xl font-extrabold">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div>)}</div></div>
        </section>

        <OrderSection language={language} t={t} />

        <section className="py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6"><div className="text-center"><SectionMark icon={BadgeCheck} /><h2 className="section-title">{t.faqTitle}</h2></div><div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card px-5 shadow-soft">{t.faqs.map(([q, a]) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">{q}<ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="pt-3 leading-7 text-muted-foreground">{a}</p></details>)}</div></div></section>

        <section className="bg-soft py-16"><div className="mx-auto max-w-6xl px-4 text-center sm:px-6"><h2 className="section-title">{t.socialTitle}</h2><p className="section-copy">{t.socialText}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Social icon={Instagram} label="@Rahtek.dz16" /><Social icon={Phone} label="Facebook · Rahtek.dz16" /><a href="https://wa.me/213555074320" target="_blank" rel="noreferrer" className="social-link"><MessageCircle className="size-5" />0555074320</a></div></div></section>

        <section className="bg-primary py-20 text-primary-foreground"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 className="font-display text-3xl font-black sm:text-5xl">{t.finalTitle}</h2><p className="mt-4 text-lg opacity-90">{t.finalText}</p><Button variant="secondary" size="lg" onClick={scrollToOrder} className="mt-8 w-full shadow-order sm:w-auto">{t.finalButton}</Button><div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm opacity-90">{t.trust.map((item) => <span key={item} className="flex items-center gap-1.5"><Check className="size-4" />{item}</span>)}</div></div></section>
      </main>

      <footer className="border-t border-border bg-background py-10"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-start"><div className="flex items-center gap-3"><img src={logoAsset.url} alt="Rahtek" className="size-12 rounded-xl object-cover" /><div><p className="font-display text-lg font-black">Rahtek.dz16</p><p className="text-sm text-muted-foreground">{t.footerNote}</p></div></div><div className="text-sm text-muted-foreground"><a href="https://wa.me/213555074320" target="_blank" rel="noreferrer" className="font-bold text-primary-strong">WhatsApp</a><p className="mt-1">© 2026 Rahtek.dz16</p></div></div></footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden"><Button variant="order" size="lg" onClick={scrollToOrder} className="w-full">{t.finalButton}</Button></div>
    </div>
  );
}

function OrderSection({ language, t }: { language: Language; t: (typeof copy)[Language] }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = { full_name: String(form.get("full_name") || "").trim(), wilaya: String(form.get("wilaya") || "").trim(), commune: String(form.get("commune") || "").trim(), phone_primary: String(form.get("phone_primary") || "").replace(/\s/g, ""), phone_secondary: String(form.get("phone_secondary") || "").replace(/\s/g, "") };
    const next: Record<string, string> = {};
    for (const key of ["full_name", "wilaya", "commune", "phone_primary"]) if (!data[key as keyof typeof data]) next[key] = t.required;
    const phonePattern = /^0[5-7][0-9]{8}$/;
    if (data.phone_primary && !phonePattern.test(data.phone_primary)) next["phone_primary"] = t.invalidPhone;
    if (data.phone_secondary && !phonePattern.test(data.phone_secondary)) next["phone_secondary"] = t.invalidPhone;
    setErrors(next); setServerError("");
    if (Object.keys(next).length) return;
    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({ ...data, phone_secondary: data.phone_secondary || null, language });
    setSubmitting(false);
    if (error) { setServerError(t.error); return; }
    setSuccess(true);
  }

  return <section id="order" className="scroll-mt-20 bg-order py-20"><div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="inline-flex rounded-full bg-highlight px-4 py-2 text-sm font-bold text-highlight-foreground">{t.price} · {t.payment}</p><h2 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">{t.formTitle}</h2><p className="mt-4 text-lg leading-8 text-muted-foreground">{t.formIntro}</p><img src={productAsset.url} alt={t.productName} className="mt-8 aspect-[16/10] w-full rounded-3xl object-cover shadow-image" /></div><div className="rounded-3xl bg-card p-5 shadow-form sm:p-8">{success ? <div className="flex min-h-96 flex-col items-center justify-center text-center" role="status"><span className="flex size-20 items-center justify-center rounded-full bg-primary-soft"><Check className="size-10 text-primary-strong" /></span><h3 className="mt-6 text-2xl font-black">{t.successTitle}</h3><p className="mt-3 text-muted-foreground">{t.successText}</p><Button variant="outline" className="mt-7" onClick={() => setSuccess(false)}>{t.another}</Button></div> : <form onSubmit={submitOrder} noValidate className="grid gap-5"><Field label={t.fullName} name="full_name" autoComplete="name" error={errors["full_name"]} /><label className="grid gap-2 text-sm font-bold">{t.wilaya}<select name="wilaya" defaultValue="" className="form-control"><option value="" disabled>{t.selectWilaya}</option>{wilayas.map((w) => <option key={w} value={w}>{w}</option>)}</select>{errors["wilaya"] && <span className="form-error">{errors["wilaya"]}</span>}</label><Field label={t.commune} name="commune" autoComplete="address-level2" error={errors["commune"]} /><div className="grid gap-5 sm:grid-cols-2"><Field label={t.phone1} name="phone_primary" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XXXXXXXX" error={errors["phone_primary"]} /><Field label={t.phone2} name="phone_secondary" type="tel" inputMode="tel" placeholder="06XXXXXXXX" error={errors["phone_secondary"]} /></div>{serverError && <p className="rounded-xl bg-destructive/10 p-3 text-sm font-bold text-destructive" role="alert">{serverError}</p>}<Button variant="order" size="lg" type="submit" disabled={submitting} className="mt-2 w-full">{submitting ? t.sending : t.submit}</Button><p className="flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" />{t.payment} · {t.delivery}</p></form>}</div></div></section>;
}

function Field({ label, error, ...props }: { label: string; error: string | undefined } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input {...props} className="form-control" aria-invalid={Boolean(error)} />{error && <span className="form-error">{error}</span>}</label>;
}

function SectionMark({ icon: Icon }: { icon: typeof Heart }) { return <span className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-highlight text-highlight-foreground"><Icon className="size-5" /></span>; }
function Social({ icon: Icon, label }: { icon: typeof Instagram; label: string }) { return <span className="social-link"><Icon className="size-5" />{label}</span>; }