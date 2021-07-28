import { TopRecommendationsRequest } from '@empathyco/x-adapter';
import { Result } from '@empathyco/x-types-old';

/**
 * Dictionary of the events of Recommendations XModule, where each key is the event name, and the
 * value is the event payload type or `void` if it has no payload.
 *
 * @public
 */
export interface RecommendationsXEvents {
  /**
   * Recommendations have been changed.
   * * Payload: The new {@link @empathyco/x-types-old#Result | recommendations}.
   */
  RecommendationsChanged: Result[];
  /**
   * Any property of the recommendations request has changed.
   * * Payload: The new recommendations request or `null` if there is not enough data in the state
   * to conform a valid request.
   */
  RecommendationsRequestChanged: TopRecommendationsRequest;
  /**
   * A recommendation result has been clicked.
   * * Payload: The {@link @empathyco/x-types-old#Result | result}.
   */
  UserClickedARecommendation: Result;
}
