import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
      }),
      { optional: true }
    ),

    group([
      query(
        ':enter',
        [style({ opacity: 0 }), animate('300ms linear', style({ opacity: 1 }))],
        { optional: true }
      ),
      query(':leave', [animate('100ms linear', style({ opacity: 0 }))], {
        optional: true,
      }),
    ]),
  ]),
]);
