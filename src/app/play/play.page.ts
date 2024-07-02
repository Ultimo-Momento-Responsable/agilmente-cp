/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  constructor() { }

  ngOnInit() {
    //@ts-ignore
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "/assets/WebGL/Build/WebGL.data",
      frameworkUrl: "/assets/WebGL/Build/WebGL.framework.js",
      codeUrl: "/assets/WebGL/Build/WebGL.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "UMR",
      productName: "AgilMente",
      productVersion: "0.22.0"
    });
  }
}
*/
//_________________________________________________________
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit, AfterViewInit {
  constructor() { }
  @ViewChild('webglContainer') webglContainer: ElementRef;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
      var buildUrl = 'assets/WebGL/Build';
      var config = {
          dataUrl: buildUrl + '/WebGL.data',
          frameworkUrl: buildUrl + '/WebGL.framework.js',
          codeUrl: buildUrl + '/WebGL.wasm',
          streamingAssetsUrl: 'StreamingAssets',
          companyName: 'UMR',
          productName: 'AgilMente',
          productVersion: '0.22.0',
          devicePixelRatio: 0,
      };

      let container = document.querySelector('#unity-container') || new Element();
      var canvas: HTMLElement = document.querySelector('#unity-canvas') || new HTMLElement();
      var loadingBar: HTMLElement = document.querySelector('#unity-loading-bar') || new HTMLElement();
      var progressBarFull: HTMLElement = document.querySelector('#unity-progress-bar-full') || new HTMLElement();
      var fullscreenButton: HTMLElement = document.querySelector('#unity-fullscreen-button') || new HTMLElement();

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          // Mobile device style: fill the whole browser client area with the game canvas:

          var meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content =
              'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
          document.getElementsByTagName('head')[0].appendChild(meta);
          container.className = 'unity-mobile';
          canvas.className = 'unity-mobile';

          // To lower canvas resolution on mobile devices to gain some
          // performance, uncomment the following line:
          // config.devicePixelRatio = 1;
      } else {
          // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:

          canvas.style.width = '360px';
          canvas.style.height = '640px';
      }

      loadingBar.style.display = 'block';
      var script = document.createElement('script');
      script.async = false;
      script.type = 'text/javascript';
      script.src = 'assets/WebGL/Build/WebGL.loader.js';
      script.onload = () => {
          createUnityInstance(canvas, config, (progress: any) => {
              progressBarFull.style.width = 100 * progress + '%';
          })
              .then((unityInstance: any) => {
                  loadingBar.style.display = 'none';
                  fullscreenButton.onclick = () => {
                      unityInstance.SetFullscreen(1);
                  };
              })
              .catch((message: any) => {
                  alert(message);
              });
      };
      this.webglContainer.nativeElement.appendChild(script);
  }
}