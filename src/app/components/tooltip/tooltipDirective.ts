import { Directive, Input, ElementRef, ComponentRef, Renderer2, Injector, ComponentFactoryResolver, ViewContainerRef, HostListener, ReflectiveInjector } from '@angular/core';
import { TooltipComponent } from './tooltipComponent';

@Directive({
    selector: '[tooltip]'
  })
  export class TooltipDirective {
    // We can pass string, template or component
    @Input('tooltip') content : string ;
    
    private componentRef : ComponentRef<TooltipComponent>;
  
    constructor( private element : ElementRef,
                 private renderer : Renderer2,
                 private injector: Injector,
                 private resolver : ComponentFactoryResolver,
                 private vcr : ViewContainerRef ) {
    }

    @HostListener('mouseenter')
    mouseenter() {
        if ( this.componentRef ) return;
        const factory = this.resolver.resolveComponentFactory(TooltipComponent);
        const injector = ReflectiveInjector.resolveAndCreate([
        {
            provide: 'tooltipConfig',
            useValue: {
            host: this.element.nativeElement
            }
        }
        ]);
        this.componentRef = this.vcr.createComponent(factory, 0, injector, this.generateNgContent());
    }

    generateNgContent() {
        if ( typeof this.content === 'string' ) {
          const element = this.renderer.createText(this.content);
          return [ [ element ] ];
        }
    }

    @HostListener('mouseout')
    mouseout() {
        this.destroy();
    }

    destroy() {
        this.componentRef && this.componentRef.destroy();
        this.componentRef = null;
    }

    ngOnDestroy() {
        this.destroy();
    }
}
