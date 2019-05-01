import { Directive, Input, ElementRef, ComponentRef, Renderer2, Injector, ComponentFactoryResolver, ViewContainerRef, HostListener, ReflectiveInjector } from '@angular/core';
import { TooltipComponent } from './tooltipComponent';

@Directive({
    selector: '[tooltip]'
  })
  export class TooltipDirective {
    
    @Input('tooltip') content : string ;

    public text: String;
  
    private buttonIsClicked = false;
    
    private componentRef : ComponentRef<TooltipComponent>;
  
    constructor( private element : ElementRef,
                 private renderer : Renderer2,
                 private injector: Injector,
                 private resolver : ComponentFactoryResolver,
                 private vcr : ViewContainerRef ) {
    }
    
    @HostListener('click')
    onClick() {
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
        this.buttonIsClicked = true;
    }
    
    @HostListener('document:click')
    onDocumentClick() {
      if (!this.buttonIsClicked) {
        this.destroy();
      }
      this.buttonIsClicked = false;
    }
    
    generateNgContent() {
        if ( typeof this.content === 'string' ) {
          const element = this.renderer.createText(this.content);
          return [ [ element ] ];
        }
    }

    destroy() {
        this.componentRef && this.componentRef.destroy();
        this.componentRef = null;
    }

    ngOnDestroy() {
        this.destroy();
    }
}
