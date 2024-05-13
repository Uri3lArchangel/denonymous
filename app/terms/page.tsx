import { Metadata } from "next";
import Link from "next/link";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Privacy Policy | Denonymous",
  description:
    " Our Terms & Conditions outline how we handle user data, ensuring a secure and private experience for anonymous communication. Learn more about responsible use and platform guidelines",
  keywords: [
    "anonymous messaging app",
    "terms and conditions",
    "privacy",
    "anonymity",
    "data handling",
    "platform guidelines.",
  ],
  alternates: {
    canonical: "https://denonymous.xyz/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};
function Page() {
  return (
    <section className="mx-auto max-w-[700px] my-10">
      <header className="text-xl font-bold">
        <h1>Denonymous Terms and Conditions</h1>
      </header>
      <main className="mt-4">
        <section className="mb-8">
          <h2 className="text-lg font-bold">1. Use of Denonymous</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">1.1 Acceptance of Terms</h3>
            <p>
              By using Denonymous, you agree to the terms outlined here and in
              our Privacy Policy.
            </p>
          </article>
          <article className="mb-4">
            <h3 className="text-base font-bold">1.2 Account</h3>
            <p>
              Users may need an account for certain features and must keep their
              credentials secure.
            </p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">2. User Content</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">2.1 Responsibility</h3>
            <p>
              Users are responsible for their content and must not violate laws
              or cause harm.
            </p>
          </article>
          <article className="mb-4">
            <h3 className="text-base font-bold">2.2 Intellectual Property</h3>
            <p>Denonymous has the right to use uploaded content.</p>
          </article>
          <article className="mb-4">
            <h3 className="text-base font-bold">2.3 Anonymous Responses</h3>
            <p>Denonymous is not liable for content sent anonymously.</p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">3. Data Handling</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">3.1 Data Storage</h3>
            <p>User data is deleted after 30 days.</p>
          </article>
          <article className="mb-4">
            <h3 className="text-base font-bold">3.2 Privacy</h3>
            <p>User data is handled according to our Privacy Policy.</p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">4. Prohibited Activities</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">4.1 Illegal Use</h3>
            <p>Users must not engage in unlawful activities.</p>
          </article>
          <article className="mb-4">
            <h3 className="text-base font-bold">4.2 Interference</h3>
            <p>Users must not disrupt Denonymous&apos; operation.</p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">5. Termination</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">5.1 Termination</h3>
            <p>
              Denonymous can suspend or terminate users&apos; access for
              violations.
            </p>
          </article>
          <article className="mb-4">
            <h3 className="text-base font-bold">5.2 Effect of Termination</h3>
            <p>Upon termination, users lose access to Denonymous.</p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">6. Disclaimer of Warranties</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">6.1 As Is</h3>
            <p>
              Denonymous does not guarantee the accuracy of information
              provided.
            </p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">7. Limitation of Liability</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">7.1 No Liability</h3>
            <p>
              Denonymous is not liable for damages resulting from the use of its
              services.
            </p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">
            8. Changes to Terms and Conditions
          </h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">8.1 Updates</h3>
            <p>Denonymous may update these terms without notice.</p>
          </article>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold">9. Governing Law</h2>
          <article className="mb-4">
            <h3 className="text-base font-bold">9.1 Jurisdiction</h3>
            <p>These terms are governed by the laws of Nigeria.</p>
          </article>
        </section>

        <section>
          <h2 className="text-lg font-bold">10. Contact Us</h2>
          <article>
            <h3 className="text-base font-bold">10.1 Feedback</h3>
            <p>
              For inquiries, contact us at
              <Link
                className="text-blue-500"
                href="mailto:contact@denonymous.xyz"
              >
                contact@denonymous.xyz
              </Link>
              .
            </p>
          </article>
        </section>
      </main>
    </section>
  );
}

export default Page;
