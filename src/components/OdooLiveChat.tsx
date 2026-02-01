'use client'

import Script from 'next/script'

const ODOO_URL = 'https://warmano.odoo.com'

export default function OdooLiveChat() {
  return (
    <>
      <Script
        id="odoo-livechat"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var script = document.createElement('script');
              script.type = 'text/javascript';
              script.async = true;
              script.src = '${ODOO_URL}/im_livechat/loader/1';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(script, s);
            })();
          `,
        }}
      />
    </>
  )
}
