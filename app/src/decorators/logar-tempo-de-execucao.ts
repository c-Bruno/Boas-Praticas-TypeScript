export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(
        target: any, // Caso eu coloque o decorator com statico, ele é o contrutor da classe. Caso não seja estatico, vai retornar o prototype
        propertyKey: string,
        descriptor: PropertyDescriptor // Sabe tudo sobre o metodo que a gente quer executar
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: Array<any>) {
            let divisor = 1;
            let unidade = 'milisegundos';

            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }

            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2= performance.now();

            console.log(`${propertyKey}, tempo de execução ${(t2 - t1) /divisor} ${unidade}`);
            retorno
        };

        return descriptor;
    }
}