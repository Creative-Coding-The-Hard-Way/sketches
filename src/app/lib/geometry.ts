import {Vec2} from "./vec2"

/**
 * Find the point of intersection between a ray and a line segment.
 *
 * Based on the description here: https://stackoverflow.com/a/565282
 *
 * @param ray_start the point of origin for the ray
 * @param ray_dir the ray's direction vector
 * @param segment_start the beginning of the line segment
 * @param segment_end the end of the line segment
 * @return Optionally returns a Vec2 for the point of intersection between the
 *   line segment and the ray. If there is no such intersection point, then no
 *   value is returned. No intersection means that the ray and line segment are
 *   parallel and separate, or that the crossing point is outside the bounds of
 *   the segment.
 */
export function intersect_ray_and_segment(
  ray_start: Vec2,
  ray_dir: Vec2,
  segment_start: Vec2,
  segment_end: Vec2
): Vec2 | undefined {
  const segment_dir = segment_end.sub(segment_start);
  const denominator = ray_dir.cross(segment_dir);

  if (denominator == 0) {
    const delta = segment_start.sub(ray_start);
    const numerator = delta.cross(ray_dir);
    if (numerator != 0) {
      // This means the ray and line segment are parallel and not touching
      return;
    } else {
      // This means that the ray and the line segment are colinear.
      let s = segment_start;
      let e = segment_end;
      if (ray_dir.dot(segment_dir) < 0) {
        [s, e] = [e, s];
      }

      const ray_len_sq = ray_dir.length_squared();
      const t0 = s.sub(ray_start).dot(ray_dir) / ray_len_sq;
      const t1 = e.sub(ray_start).dot(ray_dir) / ray_len_sq;
      if (t0 >= 0) {
        return s;
      } else if (t0 <= 0 && t1 >= 0) {
        return ray_start;
      } else {
        return;
      }
    }
  } else {
    const delta = segment_start.sub(ray_start);
    const segment_len = delta.cross(ray_dir) / denominator;
    const ray_len = delta.cross(segment_dir) / denominator;
    if (ray_len < 0) {
      return;
    }
    if (segment_len >= 0 && segment_len <= 1) {
      return segment_start.sum(segment_dir.multiply(segment_len));
    }
  }
  return;
}
