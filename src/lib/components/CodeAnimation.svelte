<script lang="ts">
  import { onMount } from 'svelte';
  
  let codeLines: string[] = [];
  let currentLineIndex = 0;
  let showCursor = true;
  let isShowingMessy = true;
  
  const messyCode = [
    '// AI-generated code with security issues',
    'const API_KEY = "sk-1234567890abcdef";  // EXPOSED!',
    'const DB_PASSWORD = "admin123";  // HARDCODED!',
    '',
    'function connectToDatabase() {',
    '  // Hardcoded credentials - security risk!',
    '  const connection = mysql.connect({',
    '    host: "production.db.server.com",',
    '    user: "root",',
    '    password: "admin123",',
    '    database: "prod_database"',
    '  });',
    '}',
    '',
    'app.get("/api/users/:id", (req, res) => {',
    '  // SQL injection vulnerability!',
    '  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;',
    '  db.query(query, (err, results) => {',
    '    if (err) console.log(err);  // Exposing errors!',
    '    res.json(results);',
    '  });',
    '});',
    '',
    '// Hardcoded production values',
    'const STRIPE_KEY = "pk_live_abcdef123456";',
    'const SERVER_URL = "http://localhost:3000";  // Wrong URL!'
  ];
  
  const cleanCode = [
    '// Secured by professional developer',
    'import { config } from "dotenv";',
    'config();',
    '',
    '// Environment variables for security',
    'const API_KEY = process.env.API_KEY;',
    'const DB_CONFIG = {',
    '  host: process.env.DB_HOST,',
    '  user: process.env.DB_USER,',
    '  password: process.env.DB_PASS,',
    '  database: process.env.DB_NAME,',
    '  ssl: { rejectUnauthorized: true }',
    '};',
    '',
    '// Protected against SQL injection',
    'app.get("/api/users/:id", async (req, res) => {',
    '  try {',
    '    const userId = parseInt(req.params.id);',
    '    if (isNaN(userId)) {',
    '      return res.status(400).json({ error: "Invalid ID" });',
    '    }',
    '    ',
    '    const query = "SELECT * FROM users WHERE id = ?";',
    '    const [results] = await db.execute(query, [userId]);',
    '    res.json(results);',
    '  } catch (error) {',
    '    logger.error("User fetch failed:", error);',
    '    res.status(500).json({ error: "Server error" });',
    '  }',
    '});'
  ];
  
  onMount(() => {
    // Start with messy code
    isShowingMessy = true;
    codeLines = [];
    
    // Typewriter effect for adding lines
    const typewriterInterval = setInterval(() => {
      const sourceCode = isShowingMessy ? messyCode : cleanCode;
      
      if (currentLineIndex < sourceCode.length) {
        codeLines = [...codeLines, sourceCode[currentLineIndex]];
        currentLineIndex++;
      } else {
        // Clear and switch to clean code
        if (isShowingMessy) {
          setTimeout(() => {
            codeLines = [];
            currentLineIndex = 0;
            isShowingMessy = false;
          }, 2000);
        } else {
          // Restart the cycle
          setTimeout(() => {
            codeLines = [];
            currentLineIndex = 0;
            isShowingMessy = true;
          }, 3000);
        }
      }
    }, 100);
    
    // Cursor blink
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor;
    }, 500);
    
    return () => {
      clearInterval(typewriterInterval);
      clearInterval(cursorInterval);
    };
  });
</script>

<div class="relative w-full min-h-[400px]" style="will-change: contents;">
  <!-- Terminal window -->
  <div class="bg-gray-900 rounded-lg shadow-2xl overflow-hidden" style="will-change: transform;">
    <!-- Terminal header -->
    <div class="bg-gray-800 px-4 py-2 flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
      <span class="ml-3 text-xs text-gray-400 font-mono">code-cleanup.ts</span>
    </div>
    
    <!-- Code content -->
    <div class="p-4 font-mono text-sm h-[350px] overflow-y-auto">
      <div class="space-y-1" style="will-change: contents;">
        {#each codeLines as line, i}
          <div class="text-gray-300 whitespace-pre">
            {#if line.includes('// AI-generated') || line.includes('// Secured by')}
              <span class="text-emerald-400 font-semibold">{line}</span>
            {:else if line.includes('EXPOSED!') || line.includes('HARDCODED!') || line.includes('security risk!') || line.includes('vulnerability!')}
              <span class="text-red-500 font-bold bg-red-900/30">{line}</span>
            {:else if line.includes('sk-') || line.includes('pk_live_') || line.includes('admin123') || line.includes('"root"')}
              <span class="text-red-400 bg-red-900/20">{line}</span>
            {:else if line.includes('process.env') || line.includes('Environment variables')}
              <span class="text-green-400">{line}</span>
            {:else if line.includes('console.log')}
              <span class="text-orange-400">{line}</span>
            {:else if line.includes('const ') || line.includes('function') || line.includes('import') || line.includes('async')}
              <span class="text-blue-400">{line}</span>
            {:else if line.includes('try') || line.includes('catch') || line.includes('throw')}
              <span class="text-purple-400">{line}</span>
            {:else if line.includes('${req.params.id}')}
              <span class="text-red-500 bg-red-900/30 font-bold">{line}</span>
            {:else}
              {line}
            {/if}
          </div>
        {/each}
        {#if showCursor}
          <span class="inline-block w-2 h-4 bg-emerald-400 animate-pulse"></span>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Floating indicators -->
  {#if isShowingMessy && codeLines.length > 0}
    <div class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce" style="will-change: transform;">
      AI Slop
    </div>
  {/if}
  
  {#if !isShowingMessy && codeLines.length > 0}
    <div class="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce" style="will-change: transform;">
      Human Verified ✓
    </div>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  div {
    animation: fadeIn 0.3s ease-out;
  }
</style>