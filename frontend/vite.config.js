import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // ✅ import react plugin
import tailwindcss from "@tailwindcss/vite"; // ✅ tailwindcss plugin

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
