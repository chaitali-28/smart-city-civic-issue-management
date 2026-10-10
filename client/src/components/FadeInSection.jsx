// import { useEffect, useRef, useState } from 'react';

// export default function FadeInSection({ children, className = '' }) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.15 }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-700 ease-out ${
//         visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//       } ${className}`}
//     >
//       {children}
//     </div>
//   );
// }
import { useEffect, useRef, useState } from 'react';

export default function FadeInSection({
  children,
  className = '',
  id,
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          // Once visible, we don't need to observe it anymore.
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-reveal ${
        visible ? 'show' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}