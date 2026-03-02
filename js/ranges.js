    document.addEventListener('DOMContentLoaded', function () {
    var durationSlider = document.getElementById('duration-slider');
    var inputFrom = document.getElementById('durationFrom');
    var inputTo = document.getElementById('durationTo');

    noUiSlider.create(durationSlider, {
    start: [34, 56],
    connect: true,
    range: {
    'min': 0,
    'max': 120
},
    step: 1,
    format: {
    to: function (value) {
    return Math.round(value);
},
    from: function (value) {
    return Number(value);
}
}
});

    // Обновляем поля при движении слайдера
    durationSlider.noUiSlider.on('update', function (values, handle) {
    if (handle === 0) {
    inputFrom.value = values[0];
} else {
    inputTo.value = values[1];
}
});

    // Обновляем слайдер при изменении полей ввода
    function setSliderHandle(handle, value) {
    var r = [null, null];
    r[handle] = value;
    durationSlider.noUiSlider.set(r);
}

    inputFrom.addEventListener('change', function () {
    var val = parseInt(this.value);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > parseInt(inputTo.value)) val = parseInt(inputTo.value);
    setSliderHandle(0, val);
});

    inputTo.addEventListener('change', function () {
    var val = parseInt(this.value);
    if (isNaN(val)) val = 120;
    if (val > 120) val = 120;
    if (val < parseInt(inputFrom.value)) val = parseInt(inputFrom.value);
    setSliderHandle(1, val);
});
});

    document.addEventListener('DOMContentLoaded', function () {
        var durationSlider = document.getElementById('duration-sliders');
        var inputFrom = document.getElementById('durationFroms');
        var inputTo = document.getElementById('durationTos');

        noUiSlider.create(durationSlider, {
            start: [36334, 126334],
            connect: true,
            range: {
                'min': 0,
                'max': 150000
            },
            step: 1,
            format: {
                to: function (value) {
                    return Math.round(value);
                },
                from: function (value) {
                    return Number(value);
                }
            }
        });

        // Обновляем поля при движении слайдера
        durationSlider.noUiSlider.on('update', function (values, handle) {
            if (handle === 0) {
                inputFrom.value = values[0];
            } else {
                inputTo.value = values[1];
            }
        });

        // Обновляем слайдер при изменении полей ввода
        function setSliderHandle(handle, value) {
            var r = [null, null];
            r[handle] = value;
            durationSlider.noUiSlider.set(r);
        }

        inputFrom.addEventListener('change', function () {
            var val = parseInt(this.value);
            if (isNaN(val)) val = 0;
            if (val < 0) val = 0;
            if (val > parseInt(inputTo.value)) val = parseInt(inputTo.value);
            setSliderHandle(0, val);
        });

        inputTo.addEventListener('change', function () {
            var val = parseInt(this.value);
            if (isNaN(val)) val = 150000;
            if (val > 150000) val = 150000;
            if (val < parseInt(inputFrom.value)) val = parseInt(inputFrom.value);
            setSliderHandle(1, val);
        });
    });
