
export const validarReservaForm = (formData,recursoReservar) => {
    const errors = {};

    console.log(formData)
    console.log(recursoReservar)

    // Validar si la fecha no es vacia
    if (!formData.fechaReserva || formData.fechaReserva.trim() === '') {
        errors.fechaReserva = 'Nombre es requerido.';
    }

    const fechaCompararDate = new Date(formData.fechaReserva);
    fechaCompararDate.setDate(fechaCompararDate.getDate()+1);
    fechaCompararDate.setHours(0, 0, 0, 0);

    const fechaActualDate = new Date(new Date().getTime() - (5 * 60 * 60 * 1000));
    fechaActualDate.setHours(0, 0, 0, 0);
    console.log(fechaActualDate)

    //Validar si la fecha no es antes del presente
    if (fechaCompararDate < fechaActualDate) {
        errors.fechaReserva = 'La fecha no puede anterior al día de hoy.';  
    }

    const diasRecurso = recursoReservar.horarioDisponible.map((horario)=>horario.dia.id);
    let diaSeleccionado = fechaCompararDate.getDay();
    if(diaSeleccionado == 0){
        diaSeleccionado=7;
    }

    console.log(fechaCompararDate.getDay())
    console.log(diaSeleccionado)
    //Validar si el recurso está disponible el día seleccionado
    if(!diasRecurso.includes(diaSeleccionado)){
        errors.fechaReserva = 'Recurso no disponible el día seleccionado';  
    }

    //Validacion de horas
    //Horarios validación
    const horaInicioDate = new Date();
    horaInicioDate.setHours(formData.horaInicio.split(':')[0], formData.horaInicio.split(':')[1], 0);
    const horaFinDate = new Date();
    horaFinDate.setHours(formData.horaFin.split(':')[0], formData.horaFin.split(':')[1], 0);



    const hoy = new Date();
    // hoy.setDate(hoy.getDate()+1);

    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const segundos = String(hoy.getSeconds()).padStart(2, '0');

    let fechaHoy = `${anio}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
    console.log(horaInicioDate)
    console.log(horaFinDate)
    console.log(fechaHoy)


    // Comparar las horas
    if(!errors.fechaReserva){
        if(formData.horaInicio == '' || formData.horaFin == ''){
            errors.horario = 'Debe especificar hora de inicio y fin.';
        }
        else if(horaFinDate < horaInicioDate) {
            errors.horario = 'La hora de fin no puede ser antes de la hora inicio.';
        }
        else if(horaInicioDate < fechaHoy) {
            errors.horario = 'La hora de inicio no puede ser antes de la hora actual';
        }
    }


    return errors;
};