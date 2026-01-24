export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border p-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} Huini. All rights reserved.</p>
      {/* TODO: Add social media links */}
    </footer>
  );
}