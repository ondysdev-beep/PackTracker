"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(false);
  const [phone, setPhone] = useState("");
  const [apiKeys, setApiKeys] = useState<
    { id: string; label: string; createdAt: string; key?: string }[]
  >([]);
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  async function generateApiKey() {
    if (!newKeyLabel.trim()) return;
    const fakeKey = `tf_${crypto.randomUUID().replace(/-/g, "")}`;
    setApiKeys((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: newKeyLabel,
        createdAt: new Date().toISOString(),
      },
    ]);
    setGeneratedKey(fakeKey);
    setNewKeyLabel("");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 font-syne text-2xl font-bold text-text-primary">
        Nastavení
      </h1>

      <div className="space-y-8">
        {/* Profile */}
        <motion.section
          className="rounded-2xl border border-border bg-surface1 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-4 font-syne text-lg font-bold text-text-primary">
            Profil
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-text-muted">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="vas@email.cz"
              />
            </div>
            <button className="btn-primary text-sm">Uložit změny</button>
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section
          className="rounded-2xl border border-border bg-surface1 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="mb-4 font-syne text-lg font-bold text-text-primary">
            Upozornění
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  E-mailová upozornění
                </p>
                <p className="text-xs text-text-muted">
                  Dostávejte e-mail při změně stavu zásilky
                </p>
              </div>
              <button
                onClick={() => setEmailNotif(!emailNotif)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  emailNotif ? "bg-accent" : "bg-surface2"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    emailNotif ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Push notifikace
                </p>
                <p className="text-xs text-text-muted">
                  Upozornění přímo v prohlížeči
                </p>
              </div>
              <button
                onClick={() => setPushNotif(!pushNotif)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  pushNotif ? "bg-accent" : "bg-surface2"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    pushNotif ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  SMS upozornění
                </p>
                <p className="text-xs text-text-muted">
                  SMS při důležitých změnách stavu
                </p>
              </div>
              <button
                onClick={() => setSmsNotif(!smsNotif)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  smsNotif ? "bg-accent" : "bg-surface2"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    smsNotif ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </label>

            {smsNotif && (
              <div>
                <label className="mb-1 block text-sm text-text-muted">
                  Telefonní číslo
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  placeholder="+420 123 456 789"
                />
              </div>
            )}
          </div>
        </motion.section>

        {/* API Keys */}
        <motion.section
          className="rounded-2xl border border-border bg-surface1 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="mb-4 font-syne text-lg font-bold text-text-primary">
            API klíče
          </h2>

          {generatedKey && (
            <div className="mb-4 rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="text-xs text-accent">
                Zkopírujte si klíč — nebude znovu zobrazen:
              </p>
              <code className="mt-1 block break-all font-mono text-sm text-text-primary">
                {generatedKey}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedKey);
                  setGeneratedKey(null);
                }}
                className="mt-2 text-xs text-accent hover:underline"
              >
                Zkopírovat a zavřít
              </button>
            </div>
          )}

          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newKeyLabel}
              onChange={(e) => setNewKeyLabel(e.target.value)}
              className="input-field flex-1 text-sm"
              placeholder="Název klíče (např. Můj e-shop)"
            />
            <button onClick={generateApiKey} className="btn-primary text-sm">
              Vytvořit
            </button>
          </div>

          {apiKeys.length > 0 ? (
            <div className="space-y-2">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface2 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {key.label}
                    </p>
                    <p className="font-mono text-xs text-text-muted">
                      Vytvořeno:{" "}
                      {new Date(key.createdAt).toLocaleDateString("cs-CZ")}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setApiKeys((prev) =>
                        prev.filter((k) => k.id !== key.id)
                      )
                    }
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Odebrat
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Zatím nemáte žádné API klíče.
            </p>
          )}
        </motion.section>
      </div>
    </div>
  );
}
