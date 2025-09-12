// netlify/plugins/environment-plugin/index.js
module.exports = {
  onPreBuild: ({ utils }) => {
    // Allow builds to proceed in no-DB/no-auth mode. Only warn for missing envs.
    const requiredWhenEnabled = [
      { name: 'FAUNA_SECRET_KEY', featureFlag: 'USE_FAUNA' },
      { name: 'JWT_SECRET', featureFlag: 'USE_JWT' },
      { name: 'VITE_ADMIN_EMAIL', featureFlag: 'USE_ADMIN_LOGIN' },
    ];

    const warnings = [];
    for (const { name, featureFlag } of requiredWhenEnabled) {
      const enabled = String(process.env[featureFlag] || '').toLowerCase() === 'true';
      if (enabled && !process.env[name]) {
        warnings.push(`${name} (required because ${featureFlag}=true)`);
      }
    }

    if (warnings.length) {
      utils.status.show({ title: 'Environment warnings', summary: warnings.join('\n') });
      console.warn('⚠️ Missing environment variables:', warnings.join(', '));
    } else {
      console.log('✅ Environment check passed (no required secrets for current config)');
    }
  },
};
