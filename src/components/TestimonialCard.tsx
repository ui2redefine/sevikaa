interface Props {
  name: string;
  city: string;
  service: string;
  rating: number;
  text: string;
}

export default function TestimonialCard({ name, city, service, rating, text }: Props) {
  return (
    <article
      className="testimonialCard card flex flex-col gap-3 animate-fade-in"
      aria-label={`Review from ${name}`}
    >
      <div className="testimonialRating flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`} role="img">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-amber-400 text-lg" aria-hidden="true">★</span>
        ))}
      </div>
      <blockquote className="testimonialQuote text-sm text-default italic leading-relaxed flex-1">
        &ldquo;{text}&rdquo;
      </blockquote>
      <footer className="testimonialFooter border-t border-subtle pt-3">
        <cite className="not-italic">
          <div className="font-semibold text-sm text-strong">{name}</div>
          <div className="text-xs text-subtle">{city} · {service}</div>
        </cite>
      </footer>
    </article>
  );
}
