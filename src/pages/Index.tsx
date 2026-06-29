import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const MOTOR_IMG =
  'https://cdn.poehali.dev/projects/35468fdc-5d08-4e60-9fd8-3e93ef4c449c/files/da41c444-5389-4e8d-a057-5309703b036f.jpg';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/35468fdc-5d08-4e60-9fd8-3e93ef4c449c/files/698a9dd3-618b-452c-a7a2-7e6dba2db73e.jpg';

const TRUST = [
  { icon: 'BadgeCheck', text: 'Сертифицированный товар' },
  { icon: 'Truck', text: 'Доставка по Приморскому краю' },
  { icon: 'Wrench', text: 'Гарантийное обслуживание' },
];

const NAV = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Характеристики', href: '#specs' },
  { label: 'Гарантия', href: '#warranty' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'О компании', href: '#about' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
];

type Fuel = 'Бензин' | 'Дизель';

interface Motor {
  id: number;
  name: string;
  fuel: Fuel;
  power: number;
  volume: number;
  price: number;
}

const MOTORS: Motor[] = [
  { id: 1, name: 'SeaForce X9', fuel: 'Бензин', power: 9.9, volume: 247, price: 89000 },
  { id: 2, name: 'DragonMarine D15', fuel: 'Дизель', power: 15, volume: 402, price: 165000 },
  { id: 3, name: 'SeaForce X40', fuel: 'Бензин', power: 40, volume: 747, price: 289000 },
  { id: 4, name: 'TyphoonPro 60', fuel: 'Бензин', power: 60, volume: 996, price: 412000 },
  { id: 5, name: 'DragonMarine D30', fuel: 'Дизель', power: 30, volume: 678, price: 298000 },
  { id: 6, name: 'SeaForce X5', fuel: 'Бензин', power: 5, volume: 123, price: 47000 },
  { id: 7, name: 'TyphoonPro 90', fuel: 'Бензин', power: 90, volume: 1432, price: 598000 },
  { id: 8, name: 'DragonMarine D50', fuel: 'Дизель', power: 50, volume: 902, price: 489000 },
  { id: 9, name: 'SeaForce X25', fuel: 'Бензин', power: 25, volume: 526, price: 198000 },
];

const STATS = [
  { value: '5—90', label: 'л.с. мощность' },
  { value: '2 года', label: 'гарантия' },
  { value: '7 дней', label: 'доставка по РФ' },
  { value: '1200+', label: 'моторов продано' },
];

const FUEL_FILTERS: ('Все' | Fuel)[] = ['Все', 'Бензин', 'Дизель'];

const fmt = (n: number) => n.toLocaleString('ru-RU');

export default function Index() {
  const [fuel, setFuel] = useState<'Все' | Fuel>('Все');
  const [power, setPower] = useState<[number]>([90]);
  const [volume, setVolume] = useState<[number]>([1500]);
  const [price, setPrice] = useState<[number]>([600000]);

  const [form, setForm] = useState({ name: '', phone: '', comment: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const filtered = useMemo(
    () =>
      MOTORS.filter(
        (m) =>
          (fuel === 'Все' || m.fuel === fuel) &&
          m.power <= power[0] &&
          m.volume <= volume[0] &&
          m.price <= price[0],
      ),
    [fuel, power, volume, price],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top">
            <img
              src="https://cdn.poehali.dev/projects/35468fdc-5d08-4e60-9fd8-3e93ef4c449c/bucket/42127df9-7ae0-41b2-8543-b94859f9e8f0.png"
              alt="MarinePower"
              className="h-8 w-auto"
            />
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Button className="font-display tracking-wide">ЗАКАЗАТЬ</Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Катер на Японском море"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="container relative grid items-center gap-10 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
              <Icon name="Zap" size={14} />
              Hidea · Huachai Power — от 60 до 200 л.с.
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-[0.98] md:text-6xl lg:text-7xl">
              Японские мощности.
              <br />
              <span className="text-primary">Китайская цена.</span>
              <br />
              Доставка во Владивосток за 7 дней.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Подвесные лодочные моторы Hidea, Huachai Power — от 60 до 200 л.с.
              Гарантия 1 год. Запчасти в наличии и под заказ.
            </p>
            <div className="mt-8">
              <Button size="lg" className="h-14 px-8 text-base font-display tracking-wide" asChild>
                <a href="#contacts">
                  <Icon name="Target" size={20} className="mr-2" />
                  ПОДОБРАТЬ МОТОР БЕСПЛАТНО
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {TRUST.map((t) => (
                <span key={t.text} className="flex items-center gap-2 text-sm text-foreground/90">
                  <Icon name={t.icon} size={18} className="text-primary" />
                  {t.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="border-y border-border bg-secondary/40 py-4 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-2xl uppercase tracking-widest text-muted-foreground">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-12">
                <span>Бензин</span><span className="text-primary">●</span>
                <span>Дизель</span><span className="text-primary">●</span>
                <span>Гарантия 2 года</span><span className="text-primary">●</span>
                <span>Доставка по РФ</span><span className="text-primary">●</span>
                <span>Запчасти в наличии</span><span className="text-primary">●</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pain block */}
      <section className="container py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Понимаем вас
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
            Знакомо?
          </h2>
          <div className="mt-8 space-y-4">
            {[
              'Японские моторы подорожали в десятки раз — Yamaha и Suzuki теперь стоят как авто из салона',
              'Б/у мотор — это лотерея: купишь чужую проблему',
              'Везти из Москвы долго и дорого — а местные магазины держат завышенные цены',
              'Не знаешь, какой мотор подойдёт под твой катер и задачи',
            ].map((pain) => (
              <div
                key={pain}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/15">
                  <Icon name="X" size={16} className="text-destructive" />
                </div>
                <p className="text-base leading-snug">{pain}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-primary/40 bg-primary/8 p-6">
            <p className="text-lg font-medium leading-snug">
              Мы решили эту проблему для любителей отдыха на катере{' '}
              <span className="text-primary">Владивостока и всего Приморья.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container grid grid-cols-2 gap-6 py-16 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="font-display text-4xl font-bold text-primary">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Solution block */}
      <section className="border-y border-border bg-secondary/20 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Наше решение
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
              Моторы напрямую с заводов Китая — без переплаты посредникам
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {/* Карточка 1 — широкая акцентная */}
            <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-primary/10 p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Icon name="Factory" size={26} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase">Прямые поставки с заводов</h3>
                <p className="mt-3 text-muted-foreground">
                  Работаем напрямую с производителями Hidea (Ханчжоу) и Huachai Power (Хэбэй).
                  Никаких московских посредников —{' '}
                  <span className="font-semibold text-primary">цена на 30–40% ниже рынка.</span>
                </p>
              </div>
            </div>

            {/* Карточка 2 */}
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                <Icon name="PackageCheck" size={26} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase">В наличии и под заказ во Владивостоке</h3>
              <p className="mt-3 text-muted-foreground">
                Склад в городе. Забрать самовывозом или доставка по Приморскому краю{' '}
                <span className="font-semibold text-foreground">в течение 1–2 дней.</span>
              </p>
            </div>

            {/* Карточка 3 */}
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
                <Icon name="FileCheck" size={26} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase">Белая схема. Официальные документы</h3>
              <p className="mt-3 text-muted-foreground">
                Сертификаты соответствия ТР ТС 026/2012. Договор купли-продажи с печатью.{' '}
                <span className="font-semibold text-foreground">Документы для регистрации в ГИМС.</span>
              </p>
            </div>

            {/* Карточка 4 */}
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                <Icon name="Wrench" size={26} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase">Гарантия и запчасти</h3>
              <p className="mt-3 text-muted-foreground">
                Гарантия 12 месяцев. Свой склад запчастей. Сервис и гарантийный ремонт в городе —{' '}
                <span className="font-semibold text-foreground">не нужно отправлять мотор в другой регион.</span>
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" className="h-14 px-10 text-base font-display tracking-wide" asChild>
              <a href="#contacts">
                <Icon name="Target" size={20} className="mr-2" />
                УЗНАТЬ ЦЕНУ НА МОЙ МОТОР
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured models */}
      <section id="catalog" className="container py-16 md:py-20">
        <div className="mb-10 text-center">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Каталог
          </span>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
            Популярные модели — в наличии
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Hidea EF200 */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card flex flex-col">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-background">
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase tracking-wide">
                Бензин
              </span>
              <img
                src="https://cdn.poehali.dev/projects/35468fdc-5d08-4e60-9fd8-3e93ef4c449c/files/076279aa-0ee2-4a78-a2c0-a4e4fcaa4ad6.jpg"
                alt="Hidea EF200"
                className="h-52 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-display">Hidea</div>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">EF200</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {['4-такт', '200 л.с.', 'Бензиновый'].map((tag) => (
                  <span key={tag} className="rounded-lg border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <Button size="lg" className="w-full font-display tracking-wide" asChild>
                  <a href="#contacts">
                    Узнать подробнее
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Huachai Power 110 */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card flex flex-col">
            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-background">
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground uppercase tracking-wide">
                Дизель
              </span>
              <img
                src="https://cdn.poehali.dev/projects/35468fdc-5d08-4e60-9fd8-3e93ef4c449c/files/29b1ca2c-0315-48e0-bf8e-b2cfe6deeda8.jpg"
                alt="Huachai Power 110"
                className="h-52 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-display">Huachai Power</div>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase">110</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {['4-такт', '110 л.с.', 'Дизельный'].map((tag) => (
                  <span key={tag} className="rounded-lg border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <Button size="lg" variant="outline" className="w-full font-display tracking-wide" asChild>
                  <a href="#contacts">
                    Узнать подробнее
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" variant="outline" className="h-14 px-10 font-display tracking-wide" asChild>
            <a href="#contacts">
              <Icon name="LayoutGrid" size={18} className="mr-2" />
              СМОТРЕТЬ ПОЛНЫЙ КАТАЛОГ
            </a>
          </Button>
        </div>
      </section>

      {/* Filter catalog */}
      <section className="container pb-16">
        <div className="mb-10">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Подбор по параметрам
          </span>
          <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">
            Подберите свой мотор
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h3 className="mb-5 flex items-center gap-2 font-display text-lg uppercase tracking-wide">
              <Icon name="SlidersHorizontal" size={18} className="text-primary" />
              Фильтры
            </h3>

            <div className="mb-6">
              <p className="mb-3 text-sm text-muted-foreground">Тип топлива</p>
              <div className="flex gap-2">
                {FUEL_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuel(f)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      fuel === f
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <FilterSlider
              label="Мощность"
              unit="л.с."
              value={power[0]}
              min={5}
              max={90}
              step={5}
              onChange={(v) => setPower([v])}
            />
            <FilterSlider
              label="Объём двигателя"
              unit="см³"
              value={volume[0]}
              min={100}
              max={1500}
              step={50}
              onChange={(v) => setVolume([v])}
            />
            <FilterSlider
              label="Цена"
              unit="₽"
              value={price[0]}
              min={40000}
              max={600000}
              step={10000}
              onChange={(v) => setPrice([v])}
            />

            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={() => {
                setFuel('Все');
                setPower([90]);
                setVolume([1500]);
                setPrice([600000]);
              }}
            >
              Сбросить
            </Button>
          </aside>

          {/* Grid */}
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Найдено моторов: <span className="text-primary">{filtered.length}</span>
            </p>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 text-primary" />
                Ничего не найдено. Измените параметры фильтра.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:glow"
                  >
                    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-secondary/40">
                      <span
                        className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
                          m.fuel === 'Дизель'
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        {m.fuel}
                      </span>
                      <img
                        src={MOTOR_IMG}
                        alt={m.name}
                        className="h-32 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-xl font-semibold uppercase">{m.name}</h3>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Icon name="Gauge" size={14} className="text-primary" />
                          {m.power} л.с.
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Icon name="Cylinder" size={14} className="text-primary" />
                          {m.volume} см³
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <span className="font-display text-2xl font-bold text-primary">
                          {fmt(m.price)} ₽
                        </span>
                      </div>
                      <Button className="mt-4 font-display tracking-wide">В КОРЗИНУ</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="border-y border-border bg-secondary/20 py-16">
        <div className="container">
          <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Технические характеристики
          </span>
          <h2 className="mb-10 font-display text-4xl font-bold uppercase md:text-5xl">
            Что под капотом
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: 'Fuel', t: 'Топливо', d: 'Бензиновые 2/4-такта и экономичные дизельные модели' },
              { icon: 'Settings', t: 'Запуск', d: 'Ручной и электростартер, дистанционное управление' },
              { icon: 'Waves', t: 'Охлаждение', d: 'Водяное охлаждение, защита от перегрева и коррозии' },
              { icon: 'Wrench', t: 'Управление', d: 'Румпельное и дистанционное, регулировка дифферента' },
              { icon: 'ShieldCheck', t: 'Защита', d: 'Антикоррозийное покрытие для пресной и солёной воды' },
              { icon: 'Battery', t: 'Генератор', d: 'Встроенный генератор 12V для зарядки аккумулятора' },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <Icon name={s.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold uppercase">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty + Delivery */}
      <section className="container grid gap-6 py-16 md:grid-cols-2">
        <div id="warranty" className="rounded-2xl border border-border bg-card p-8">
          <Icon name="BadgeCheck" size={36} className="mb-4 text-primary" />
          <h2 className="font-display text-3xl font-bold uppercase">Гарантия</h2>
          <p className="mt-3 text-muted-foreground">
            Официальная гарантия 2 года на все моторы. Собственный сервисный центр и
            склад оригинальных запчастей в наличии.
          </p>
          <ul className="mt-5 space-y-3">
            {['2 года заводской гарантии', 'Сервисное обслуживание', 'Запчасти в наличии', 'Помощь в обкатке'].map(
              (i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <Icon name="Check" size={16} className="text-accent" />
                  {i}
                </li>
              ),
            )}
          </ul>
        </div>
        <div id="delivery" className="rounded-2xl border border-border bg-card p-8">
          <Icon name="Truck" size={36} className="mb-4 text-primary" />
          <h2 className="font-display text-3xl font-bold uppercase">Доставка</h2>
          <p className="mt-3 text-muted-foreground">
            Отправляем моторы по всей России транспортными компаниями. Среднее время
            доставки — от 7 дней.
          </p>
          <ul className="mt-5 space-y-3">
            {['Доставка по всей РФ', 'Транспортные компании', 'Самовывоз со склада', 'Страхование груза'].map((i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <Icon name="Check" size={16} className="text-accent" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-border bg-secondary/20 py-16">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              О компании
            </span>
            <h2 className="font-display text-4xl font-bold uppercase md:text-5xl">
              МаринаПауэр
            </h2>
            <p className="mt-5 text-muted-foreground">
              Мы напрямую работаем с китайскими заводами-производителями лодочных
              моторов более 8 лет. Поставляем технику, проверенную на воде, и
              обеспечиваем полную поддержку клиентов — от выбора до сервиса.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: '8 лет', l: 'на рынке' },
                { v: '15+', l: 'моделей' },
                { v: '98%', l: 'довольных' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-sm text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
            <img src={MOTOR_IMG} alt="Мотор" className="relative w-64 animate-float md:w-80" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="container py-16">
        <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
          Отзывы
        </span>
        <h2 className="mb-10 font-display text-4xl font-bold uppercase md:text-5xl">
          Нам доверяют рыбаки Приморья
        </h2>

        {/* Trust stats row */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { v: '120+', l: 'Моторов продано' },
            { v: '3 года', l: 'На рынке Приморья' },
            { v: '12 мес', l: 'Гарантия на всё' },
            { v: '1–2 дня', l: 'Доставка по краю' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              n: 'Сергей К.',
              t: 'пос. Трудовое',
              r: 'Брал Hidea EF150 весной. Сезон отходил — ни одной проблемы. Документы дали сразу, в ГИМС встали без вопросов. Спасибо ребятам, буду рекомендовать.',
            },
            {
              n: 'Алексей М.',
              t: 'Находка',
              r: 'Сравнивал с Yamaha — разница в цене 160 тысяч рублей. Взял Huachai Power 60 л.с., уже второй сезон катаюсь. Качество на уровне.',
            },
            {
              n: 'Виктор Д.',
              t: 'Владивосток',
              r: 'Оперативно подобрали мотор под мой катер 9 метров. Привезли на следующий день. Всё честно, без разводов.',
            },
          ].map((rv) => (
            <div key={rv.n} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="flex-1 text-muted-foreground leading-relaxed">«{rv.r}»</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display font-bold text-primary">
                  {rv.n[0]}
                </div>
                <div>
                  <div className="font-semibold">{rv.n}</div>
                  <div className="text-sm text-muted-foreground">{rv.t}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <h3 className="mb-4 text-center font-display text-2xl font-semibold uppercase">
            Частые вопросы
          </h3>
          <Accordion type="single" collapsible>
            {[
              { q: 'Какой мотор выбрать для лодки ПВХ?', a: 'Для лодок ПВХ обычно подходят моторы 5–15 л.с. Точный подбор зависит от веса лодки и количества пассажиров — поможем с выбором.' },
              { q: 'Нужна ли регистрация мотора?', a: 'Моторы мощнее 8 л.с. подлежат регистрации в ГИМС. Мы предоставляем все необходимые документы.' },
              { q: 'Как происходит обкатка?', a: 'Первые 10 часов работы на пониженных оборотах. Подробную инструкцию и поддержку предоставляем при покупке.' },
            ].map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact form */}
      <section id="contacts" className="border-t border-border bg-secondary/20 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2 items-start">

              {/* Left — headline */}
              <div className="md:sticky md:top-24">
                <span className="font-display text-sm uppercase tracking-[0.3em] text-primary">
                  Заявка
                </span>
                <h2 className="mt-2 font-display text-4xl font-bold uppercase md:text-5xl">
                  Подберём мотор за 15 минут
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  Расскажите о своём плавсредстве — и мы подберём оптимальную модель с учётом
                  бюджета и задач. Бесплатно. Без обязательств.
                </p>
                <div className="mt-8 space-y-4">
                  <a href="tel:+79841885391" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon name="Phone" size={18} className="text-primary" />
                    </div>
                    <span>+7 (984) 188-53-91</span>
                  </a>
                  <a href="https://t.me/MarinePower" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon name="Send" size={18} className="text-primary" />
                    </div>
                    <span>Telegram: @MarinePower</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                      <Icon name="MapPin" size={18} className="text-primary" />
                    </div>
                    <span>Владивосток, самовывоз и доставка по Приморскому краю</span>
                  </div>
                </div>
              </div>

              {/* Right — form */}
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                {sent ? (
                  <div className="relative flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                      <Icon name="CheckCircle" size={36} className="text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase">Заявка принята!</h3>
                    <p className="mt-3 text-muted-foreground">Перезвоним в течение 15 минут в рабочее время.</p>
                    <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                      Отправить ещё
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative space-y-5">
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">Ваше имя</label>
                      <input
                        required
                        type="text"
                        placeholder="Александр"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">Номер телефона</label>
                      <input
                        required
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">
                        Комментарий <span className="text-muted-foreground/50">(необязательно)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Катер 6м, рыбалка, бюджет до 400 тыс."
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                        className="w-full resize-none rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full h-13 text-base font-display tracking-wide">
                      <Icon name="Flame" size={20} className="mr-2" />
                      ПОЛУЧИТЬ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ
                    </Button>
                    <p className="flex items-start gap-2 text-xs text-muted-foreground/70 leading-relaxed">
                      <Icon name="Lock" size={14} className="mt-0.5 shrink-0 text-muted-foreground/50" />
                      Никакого спама. Звоним только для подбора мотора. Данные не передаём третьим лицам.
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon name="Anchor" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display tracking-wide">
              МАРИНА<span className="text-primary">ПАУЭР</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 МаринаПауэр. Лодочные моторы из Китая.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FilterSlider({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-primary">
          до {fmt(value)} {unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      />
    </div>
  );
}