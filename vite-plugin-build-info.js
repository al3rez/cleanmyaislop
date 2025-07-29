import { execSync } from 'child_process';

export function buildInfoPlugin() {
  return {
    name: 'build-info-plugin',
    transform(code, id) {
      if (id.includes('BuildInfo.svelte')) {
        const buildTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let commitHash = 'dev';
        
        try {
          commitHash = execSync('git rev-parse --short HEAD').toString().trim();
        } catch (e) {
          // Not a git repo or git not available
        }
        
        code = code.replace('__BUILD_TIME__', buildTime);
        code = code.replace('__COMMIT_HASH__', commitHash);
        
        return code;
      }
    }
  };
}