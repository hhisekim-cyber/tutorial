// 수강 신청 폼: 검증 + ?course=slug 로 관심 강의 자동 선택
const form = document.getElementById('applyForm');
if (form) {
  const msg = form.querySelector('.form__msg');
  const select = form.elements.namedItem('course');

  const preset = new URLSearchParams(location.search).get('course');
  if (preset && [...select.options].some((o) => o.value === preset)) select.value = preset;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((field) => {
      const valid = field.checkValidity();
      field.classList.toggle('is-invalid', !valid);
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      msg.className = 'form__msg is-error';
      msg.textContent = firstInvalid.name === 'agree'
        ? '개인정보 수집 및 이용에 동의해 주세요.'
        : '입력 항목을 다시 확인해 주세요.';
      firstInvalid.focus();
      return;
    }

    // TODO: 실제 서버/폼 서비스로 전송하도록 연결하세요.
    const name = form.elements.namedItem('name').value.trim();
    msg.className = 'form__msg is-success';
    msg.textContent = `${name}님, 신청이 접수되었습니다! 24시간 내로 연락드릴게요.`;
    form.reset();
  });

  form.querySelectorAll('input, select, textarea').forEach((field) =>
    field.addEventListener('input', () => field.classList.remove('is-invalid'))
  );
}
