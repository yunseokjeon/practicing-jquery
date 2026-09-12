// 버튼을 누르기 전에 각 함수의 결과를 예상해 보세요.
// 연습할 때는 함수 본문을 지우고 직접 다시 작성해 보는 것을 권장합니다.
const readers = {
  basic() {
    return $('#basic-table > tbody > tr').map(function () {
      const $cells = $(this).children('td');
      return {
        name: $cells.eq(0).text().trim(),
        age: Number($cells.eq(1).text().trim())
      };
    }).get();
  },

  rich() {
    return $('#rich-table > tbody > tr').map(function () {
      const $cells = $(this).children('td');
      return {
        product: $cells.eq(0).text().trim(),
        quantity: Number($cells.eq(1).find('input').val()),
        status: $cells.eq(2).find('[data-status]').attr('data-status')
      };
    }).get();
  },

  grouped() {
    return $('#grouped-table > tbody > tr').map(function () {
      const $row = $(this);
      const $cells = $row.children('td');
      return {
        group: $row.closest('tbody').attr('data-group'),
        subject: $cells.eq(0).text().trim(),
        score: Number($cells.eq(1).text().trim())
      };
    }).get();
  },

  mixed() {
    return $('#mixed-cell-table > tbody > tr').map(function () {
      const $cells = $(this).children('td');
      const $mixedCell = $cells.eq(0);
      const texts = $mixedCell.contents().filter(function () {
        return this.nodeType === Node.TEXT_NODE;
      }).map(function () {
        return this.textContent.trim();
      }).get();
      return {
        product: texts[0],
        quantity: Number($mixedCell.find('input').val()),
        unit: texts[1],
        unitPrice: Number($cells.eq(1).text().replace(/[^\d]/g, ''))
      };
    }).get();
  },

  orders() {
    return $('#orders-table > tbody > tr').map(function () {
      const $row = $(this);
      const amountText = $row.children('td').eq(1).text();
      return {
        id: $row.attr('data-order-id'),
        amount: Number(amountText.replace(/[^\d]/g, ''))
      };
    }).get();
  }
};

$('button[data-example]').on('click', function () {
  const example = $(this).attr('data-example');
  $(`#${example}-result`).text(JSON.stringify(readers[example](), null, 2));
});
