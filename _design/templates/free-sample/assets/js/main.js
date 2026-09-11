/* ==========================================================================
   STARTER — page behaviour
   One thing only: catch the sign-up so the page never appears to do nothing.
   Wire the form to your own list (Mailchimp, Buttondown, a Google Form…)
   by changing the <form action="…"> in index.html, then delete this file.
   ========================================================================== */

(function () {
  'use strict';

  var form = document.querySelector('.signup');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    // No backend ships with this sample, so stop the page reloading and say
    // something honest instead of pretending the address was saved.
    e.preventDefault();

    var note = document.querySelector('.fineprint');
    if (!note) return;
    note.textContent = 'This form is not connected yet — see README.md.';
    note.style.color = 'var(--accent)';
  });
})();
