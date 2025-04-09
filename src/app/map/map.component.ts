import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as scale from 'd3-scale';
import * as topojson from 'topojson-client';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { GeometryCollection } from 'topojson-specification';
import { TopographyService } from 'src/app/topography.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  projection: any;
  topoFeatureStates: any;
  path: any;
  svg: any;
  i: boolean = true;
  @Input() mapType: any;
  allData: any;
  pg: any;
  mapDetails: any;
  constructor(private el: ElementRef, private topo: TopographyService) { }
  ngOnInit(): void {
    let area = this.mapType.area;
    this.initialMap(area);
    if (this.mapType.type == false) {
      // this.get_state_default_heatmap(this.mapType.name);
      this.i = false;
      d3.select("#map_svg").classed('map_state', true);
      d3.select("#map_svg").classed('map_india', false);
    } else {
      this.i = true;
      d3.select("#map_svg").classed('map_state', false);
      d3.select("#map_svg").classed('map_india', true);
    }
  }
  initialMap(area: any): void {
    this.topo.getTopographyData(area).subscribe((topography: any) => {
      this.allData = topography;
      this.draw(topography);
    });
  }
  draw(topography: any): void {
    const { width, height } = this.getMapContainerWidthAndHeight();
    this.topoFeatureStates = topojson.feature(topography, this.i ? topography.objects.default : topography.objects.districts);
    this.topoFeatureStates.features.map((s: any) => {

    })
    // this.allDataFeatures = this.topoFeatureStates.features;
    this.projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([width, height], this.topoFeatureStates);

    this.path = d3.geoPath(this.projection);


    // render svg
    this.svg = d3
      .select('#map_svg')
      .attr('width', width)
      .attr('height', height);

    this.renderStateFeaures(topography);

    // resize event
    d3.select(window).on('resize', this.resizeMap);
  }

  resizeMap = () => {
    const { width, height } = this.getMapContainerWidthAndHeight();
    this.svg.attr('width', width).attr('height', height);
    this.projection.fitSize([width, height], this.topoFeatureStates);
    this.svg.selectAll('path').attr('d', this.path);
  };

  renderStateFeaures(topography: any): void {
    d3.select("#map_svg")
      .style("opacity", 0);

    this.svg
      .append('g')
      .attr('class', 'state')
      .attr('stroke-width', '1')
      .attr('fill', 'white')
      .selectAll('path.state')
      .data(
        topojson.feature(
          topography,
          (this.i ? topography.objects.default : topography.objects.districts) as GeometryCollection
        ).features
      )
      .join('path')
      .attr('id', (d: any) => {
        let areaName;
        let kk = this.i ? d.id.replace(/ /g, '') : d.properties.district.replace(/ /g, '');
        if (kk == 'Jammu&Kashmir' || kk == 'JammuKashmir') {
          areaName = 'JammuKashmir';
        }
        else if (kk == 'Andaman&Nicobar' || kk == 'AndamanNicobarIslands') {
          areaName = 'AndamanNicobarIslands';
        }
        else {
          areaName = kk;
        }
        return areaName;
      })
      .attr('d', this.path)
      .attr('class', 'st')
      .transition()
      .duration(2000);

    if (this.i) {
      d3.selectAll('.st')
        .data(
          topojson.feature(
            topography,
            (this.i ? topography.objects.default : topography.objects.districts) as GeometryCollection
          ).features
        );
      //----- Appear anim - for India ------
      d3.select("#map").classed('map_wrap_india', true);
      d3.select("#map_svg").classed('map_india', true);
      d3.select("#map_svg").classed('map_state', false);
      // ---

      d3.select("#map_svg.map_india")
        .transition()
        .duration(600)
        .style("opacity", 1)

      setTimeout(() => {
        d3.selectAll('.st')
          .on("mouseover", (e: any) => this.hoverHandle(e))
          .on("mousemove", (e: any) => this.moveHandle(e))
        // .on("mouseout", (e: any) => this.mouseoutHandle(e))
        // .on("click", (e: any) => this.doubleClickHandle(e))
      }, 1300);


    } else {
      d3.select("#map").classed('map_wrap_india', false);
      //----- Appear anim - for State ------
      d3.select("#map_svg").classed('map_state', true);
      d3.select("#map_svg").classed('map_india', false);
      // -----------------------------------------------------------

      d3.select("#map_svg.map_state")
        .transition()
        .duration(400)
        .style("opacity", 1)

      setTimeout(() => {
        d3.selectAll('.st')
          .on("mouseover", (e: any) => this.hoverHandle(e))
          .on("mousemove", (e: any) => this.moveHandle(e))
        // .on("mouseout", (e: any) => this.mouseoutHandle(e))
        // .on("click", (e: any) => this.clickHandle(e))
      }, 1300);

    }
  }

  getMapContainerWidthAndHeight = (): { width: number; height: number } => {
    const mapContainerEl = this.el.nativeElement.querySelector(
      '#map'
    ) as HTMLDivElement;
    var map_svg_wt = 0;
    if (this.pg == 'company') {
      (this.i) ? map_svg_wt = -40 : map_svg_wt;
      const width = mapContainerEl.clientWidth + map_svg_wt;
      const height = (width / 1100) * 550; //800

      return { width, height };
    } else {
      (this.i) ? map_svg_wt = 60 : map_svg_wt = -10;
      const width = mapContainerEl.clientWidth + map_svg_wt;
      const height = (width / 1150) * 750; //800

      return { width, height };
    }

  };

  createTooltip = (areaName: string) => {
    setTimeout(() => {
      d3.selectAll('#tips').html(
        '<div class="title-row d-flex justify-between"><div class="title">' + areaName + '</div></div></div>');
    }, 500)
  }


  hoverHandle = (e: any) => {
    d3.selectAll('.st').classed('hvrd', false);
    this.mapDetails = this.i ? e.target.__data__.properties.name : e.target.__data__.properties.district;

    d3.select("#tips").style('display', 'block');
    d3.select(e.target).classed('hvrd', true);

    d3.selectAll('#tips')
      .html('<div class="title">' + this.mapDetails + '</div>');
  }


  moveHandle = (e: any) => {
    var position = d3.pointer(e);
    let th: any = d3.select("#tips").style('height');
    let tips_left = position[0];
    let tips_top = position[1];
    //------------------
    var tips_pos_x = 0;
    var tips_pos_y = 0;
    (this.i) ? tips_pos_x = 75 : tips_pos_x = -10;
    //--------------
    // if (tips_top > 170) {
    //   var tips_pos_y = -80 + position[1];
    // } else {
    var tips_pos_y = 80 + position[1];
    //}
    // if (tips_left > 480) {
    //   var tips_pos_x = 0;
    //   (this.i) ? tips_pos_x = -200 : tips_pos_x = -220;
    //   let gh: any = d3.select("#tips").style('width');
    //   tips_pos_x = tips_pos_x - Math.abs(gh);
    // }

    d3.select("#tips").style('top', ((tips_pos_y)) + "px").style('right', 'auto').style('left', ((tips_left - tips_pos_x)) + "px");
  }

}
